-- ==========================================
-- PHASE 10: TRANSACTIONAL SCHEMA (MIGRATION 002)
-- ==========================================

-- 1. Academic Tracking
CREATE TABLE IF NOT EXISTS teacher_subjects (
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (teacher_id, subject_id, class_id)
);

CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id),
  date DATE NOT NULL,
  status TEXT CHECK (status IN ('present','absent','late')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, subject_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id),
  test_date DATE NOT NULL,
  total_marks INTEGER NOT NULL CHECK (total_marks > 0),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS test_marks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  test_id UUID REFERENCES tests(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  marks NUMERIC CHECK (marks >= 0),
  remarks TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(test_id, student_id)
);

CREATE TRIGGER test_marks_updated_at
  BEFORE UPDATE ON test_marks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- 2. Financial Ledger
CREATE TABLE IF NOT EXISTS fees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  total_amount NUMERIC NOT NULL CHECK (total_amount > 0),
  paid_amount NUMERIC DEFAULT 0 CHECK (paid_amount >= 0),
  due_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','partial','paid','overdue')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS fee_installments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fee_id UUID REFERENCES fees(id) ON DELETE CASCADE,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  paid_on DATE,
  receipt_no TEXT,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Intercom & Messaging
CREATE TABLE IF NOT EXISTS message_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  initiator_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  subject TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open','resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID REFERENCES message_threads(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id),
  receiver_id UUID REFERENCES profiles(id),
  sender_role TEXT,
  receiver_role TEXT,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_messages_thread ON messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(is_read) WHERE is_read = false;

-- 4. Oversight & Logs
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS csv_import_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  imported_by UUID REFERENCES profiles(id),
  file_name TEXT,
  total_rows INTEGER,
  success_rows INTEGER,
  failed_rows INTEGER,
  errors JSONB,
  imported_at TIMESTAMPTZ DEFAULT now()
);
