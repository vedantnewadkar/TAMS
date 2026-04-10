-- Phase 12: Notification Ledger & Fee Automation Trigger

-- 1. Create Email Logs Table
CREATE TABLE IF NOT EXISTS email_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient TEXT NOT NULL,
    subject TEXT,
    template TEXT,
    status TEXT CHECK (status IN ('queued', 'sent', 'failed')),
    error TEXT,
    sent_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Add Email Preferences to Profiles
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS email_preferences JSONB DEFAULT '{"digest": true, "messages": true, "attendance": true, "fees": true}';

-- 3. Fee Status Automation Trigger
-- This function recalculates the paid_amount and status whenever an installment is touched.

CREATE OR REPLACE FUNCTION update_fee_status()
RETURNS TRIGGER AS $$
DECLARE
    v_total_amount NUMERIC;
    v_paid_amount NUMERIC;
    v_due_date DATE;
BEGIN
    -- Get the parent fee record info
    SELECT total_amount, due_date INTO v_total_amount, v_due_date
    FROM fees
    WHERE id = NEW.fee_id;

    -- Calculate total paid from all installments
    SELECT COALESCE(SUM(amount), 0) INTO v_paid_amount
    FROM fee_installments
    WHERE fee_id = NEW.fee_id;

    -- Update the parent fee record
    UPDATE fees
    SET 
        paid_amount = v_paid_amount,
        status = CASE
            WHEN v_paid_amount >= v_total_amount THEN 'paid'
            WHEN v_paid_amount > 0 THEN 'partial'
            WHEN v_due_date < CURRENT_DATE THEN 'overdue'
            ELSE 'pending'
        END,
        updated_at = now()
    WHERE id = NEW.fee_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for Insert/Update on fee_installments
DROP TRIGGER IF EXISTS fee_installment_sync_trigger ON fee_installments;
CREATE TRIGGER fee_installment_sync_trigger
AFTER INSERT OR UPDATE ON fee_installments
FOR EACH ROW
EXECUTE FUNCTION update_fee_status();

-- 4. Indices for Communication
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
