/**
 * TAMS Email Templates
 * Responsive HTML layouts for institutional communication.
 */

const baseLayout = (content) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #18181b; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e7; border-radius: 16px; }
    .header { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e4e4e7; }
    .logo { font-size: 24px; font-weight: bold; color: #4f46e5; text-decoration: none; }
    .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid #e4e4e7; font-size: 12px; color: #71717a; text-align: center; }
    .button { display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white !important; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="#" class="logo">TAMS</a>
    </div>
    ${content}
    <div class="footer">
      <p>This is an automated notification from TAMS University Management System.</p>
      <p>&copy; ${new Date().getFullYear()} TAMS Institutional Portal. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const mentorMessageTemplate = (senderName, previewText, threadLink) => baseLayout(`
  <h2>New Message from ${senderName}</h2>
  <p>Your mentor has sent you a new message regarding your academic progress:</p>
  <blockquote style="background: #f4f4f5; padding: 16px; border-radius: 12px; font-style: italic;">
    "${previewText}"
  </blockquote>
  <a href="${threadLink}" class="button">View & Reply</a>
`);

export const attendanceAlertTemplate = (studentName, percentage) => baseLayout(`
  <h2 style="color: #ef4444;">Attendance Warning</h2>
  <p>Dear Parent/Student,</p>
  <p>This is a formal notification that <strong>${studentName}'s</strong> overall attendance has dropped to <strong>${percentage}%</strong>, which is below the institutional requirement of 75%.</p>
  <p>Please ensure regular attendance to avoid academic penalties.</p>
  <a href="#" class="button">Check Attendance Logs</a>
`);

export const feeReminderTemplate = (amount, dueDate) => baseLayout(`
  <h2 style="color: #f59e0b;">Fee Payment Reminder</h2>
  <p>An installment of <strong>₹${Number(amount).toLocaleString()}</strong> is due on <strong>${new Date(dueDate).toLocaleDateString()}</strong>.</p>
  <p>Please complete the payment via the institutional portal to avoid late fees.</p>
  <a href="#" class="button">Pay Now</a>
`);
