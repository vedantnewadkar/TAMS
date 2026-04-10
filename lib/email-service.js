import nodemailer from 'nodemailer';
import { createAdminClient } from './supabase/admin';

/**
 * TAMS Email Service
 * Handles SMTP delivery and logging.
 */
class EmailService {
  constructor() {
    this.transporter = null;
    this.isConfigured = false;
    this.init();
  }

  init() {
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_PORT === '465',
        auth: { user, pass },
      });
      this.isConfigured = true;
    }
  }

  /**
   * Send Email with automated logging
   */
  async sendEmail({ to, subject, body, template = 'general' }) {
    const supabase = createAdminClient();
    let status = 'queued';
    let errorLog = null;

    if (!this.isConfigured) {
      console.warn(`Email Service: SMTP not configured. Mocking email to ${to}`);
      status = 'sent'; // Mocked as sent
    } else {
      try {
        await this.transporter.sendMail({
          from: process.env.SMTP_FROM || 'TAMS <noreply@TAMS.edu>',
          to,
          subject,
          html: body,
        });
        status = 'sent';
      } catch (err) {
        console.error("Email Delivery Failed:", err);
        status = 'failed';
        errorLog = err.message;
      }
    }

    // Log to database if enabled
    if (supabase) {
      await supabase.from('email_logs').insert({
        recipient: to,
        subject,
        template,
        status,
        error: errorLog
      });
    }

    return { success: status === 'sent', error: errorLog };
  }
}

export const emailService = new EmailService();
