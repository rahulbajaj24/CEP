import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

const SENDER_EMAIL = process.env.SENDER_EMAIL || 'rsbajaj2496@gmail.com';
const SENDER_NAME = process.env.SENDER_NAME || 'ADHAR Adaption Center';

export async function initMailer() {
  const appPassword = process.env.GMAIL_APP_PASSWORD;

  if (appPassword && appPassword !== 'your_app_password_here') {
    // Production: Gmail SMTP
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SENDER_EMAIL,
        pass: appPassword,
      },
    });
    console.log(`📧 Gmail SMTP configured (sender: ${SENDER_EMAIL})`);
  } else {
    // Fallback: Ethereal test account
    console.log('⚠️ Gmail App Password not set — using Ethereal for email testing');
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: { user: testAccount.user, pass: testAccount.pass },
    });
    console.log(`📧 Ethereal test account: ${testAccount.user}`);
  }
}

// ─── Types ───
interface VolunteerData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  location: string;
}

interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Send Email (shared helper) ───
async function sendEmail(to: string, subject: string, html: string): Promise<string | null> {
  if (!transporter) {
    console.warn('⚠️ Mailer not initialized, skipping email');
    return null;
  }

  const info = await transporter.sendMail({
    from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    to,
    subject,
    html,
  });

  // Ethereal returns a preview URL; Gmail does not
  const previewUrl = nodemailer.getTestMessageUrl(info);
  if (previewUrl) {
    console.log(`📧 Email sent to ${to} (Preview: ${previewUrl})`);
  } else {
    console.log(`📧 Email sent to ${to} (Message ID: ${info.messageId})`);
  }

  return typeof previewUrl === 'string' ? previewUrl : null;
}

// ─── Send Volunteer Confirmation Email ───
export async function sendVolunteerConfirmation(volunteer: VolunteerData) {
  return sendEmail(
    volunteer.email,
    '🎉 Welcome to ADHAR — Registration Confirmed!',
    buildConfirmationHTML(volunteer)
  );
}

// ─── Send OTP Email ───
export async function sendOTPEmail(email: string, otp: string) {
  return sendEmail(email, '🔐 Your ADHAR Verification Code', buildOTPHTML(otp));
}

// ─── Send SMS (placeholder — logs to console) ───
export async function sendVolunteerSMS(phone: string, name: string) {
  // SMS requires a paid service like Twilio. For now, log the message.
  console.log(`📱 SMS notification (logged, no SMS provider configured):`);
  console.log(`   To: ${phone}`);
  console.log(`   Message: Hi ${name}, your ADHAR volunteer registration is complete! 🎉`);
  return null;
}

// ─── Contact Email Functions ───

export async function sendContactNotification(contact: ContactData) {
  return sendEmail(
    SENDER_EMAIL, // Send to ADHAR admin
    `📩 New Contact Message from ${contact.name}${contact.subject ? ` — ${contact.subject}` : ''}`,
    buildContactNotificationHTML(contact)
  );
}

export async function sendContactAutoReply(name: string, email: string) {
  return sendEmail(
    email,
    '✅ We received your message — ADHAR',
    buildContactAutoReplyHTML(name)
  );
}

// ─── HTML Templates ───

function buildConfirmationHTML(v: VolunteerData): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); padding: 36px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; letter-spacing: 2px;">ADHAR</h1>
        <p style="color: #cbd5e1; margin: 8px 0 0; font-size: 13px; letter-spacing: 1px;">Adaption Center</p>
      </div>

      <div style="padding: 36px;">
        <h2 style="color: #1e3a5f; margin: 0 0 12px; font-size: 22px;">
          Hi ${v.name} 😊
        </h2>
        <p style="color: #475569; line-height: 1.7; font-size: 15px; margin: 0 0 8px;">
          Your registration with <strong>ADHAR</strong> has been successfully completed! 🎉
        </p>
        <p style="color: #475569; line-height: 1.7; font-size: 15px; margin: 0 0 24px;">
          Thank you for stepping forward to make a difference — we truly appreciate your support.
        </p>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 0 0 24px;">
          <h3 style="color: #334155; margin: 0 0 14px; font-size: 15px;">📋 Your Registration Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 100px;">Name</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${v.name}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${v.email}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Phone</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${v.phone}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Interest</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${v.interest}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Location</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;">${v.location}</td>
            </tr>
          </table>
        </div>

        <p style="color: #475569; font-size: 14px; line-height: 1.7; margin: 0 0 24px;">
          Our team will get in touch with you soon with further details.
        </p>

        <div style="background: #f0f9ff; border-left: 4px solid #2d5a8e; border-radius: 0 8px 8px 0; padding: 16px 20px;">
          <p style="color: #1e3a5f; font-size: 14px; font-weight: 600; margin: 0 0 8px;">
            📍 Our Address
          </p>
          <p style="color: #64748b; font-size: 13px; line-height: 1.7; margin: 0;">
            "Madhav Smruti"<br>
            Plot No. 48 &amp; 49, Sector 27,<br>
            Janata Vasahat, Pradhikaran,<br>
            Near Akurdi Railway Station,<br>
            Pune – 411044
          </p>
        </div>

        <p style="color: #475569; font-size: 15px; margin: 24px 0 0;">
          Looking forward to working together! 💙
        </p>
      </div>

      <div style="background: #1e3a5f; padding: 20px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          ADHAR Adaption Center • Nigdi, Pune • Since 1991
        </p>
      </div>
    </div>
  `;
}

function buildOTPHTML(otp: string): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">ADHAR</h1>
        <p style="color: #cbd5e1; margin: 8px 0 0; font-size: 14px;">Email Verification</p>
      </div>
      <div style="padding: 32px; text-align: center;">
        <p style="color: #64748b; font-size: 16px; margin: 0 0 24px;">
          Use the code below to verify your email address:
        </p>
        <div style="background: #ffffff; border: 2px dashed #2d5a8e; border-radius: 12px; padding: 24px; margin: 0 auto; max-width: 280px;">
          <p style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1e3a5f; margin: 0; font-family: 'Courier New', monospace;">
            ${otp}
          </p>
        </div>
        <p style="color: #94a3b8; font-size: 13px; margin: 24px 0 0;">
          This code expires in <strong>5 minutes</strong>. Do not share it with anyone.
        </p>
      </div>
      <div style="background: #f1f5f9; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">
          ADHAR Adaption Center • Nigdi, Pune
        </p>
      </div>
    </div>
  `;
}

function buildContactNotificationHTML(c: ContactData): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">ADHAR</h1>
        <p style="color: #cbd5e1; margin: 8px 0 0; font-size: 14px;">New Contact Message</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #1e3a5f; margin: 0 0 16px; font-size: 20px;">📩 New message received</h2>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 0 0 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px; width: 80px;">From</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${c.name}</td>
            </tr>
            <tr style="border-top: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Email</td>
              <td style="padding: 8px 0; color: #1e293b; font-size: 14px;"><a href="mailto:${c.email}" style="color: #2d5a8e;">${c.email}</a></td>
            </tr>
            ${c.subject ? `<tr style="border-top: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Subject</td><td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${c.subject}</td></tr>` : ''}
          </table>
        </div>
        <div style="background: #f0f9ff; border-left: 4px solid #2d5a8e; border-radius: 0 8px 8px 0; padding: 16px 20px;">
          <p style="color: #1e3a5f; font-size: 13px; font-weight: 600; margin: 0 0 8px;">Message:</p>
          <p style="color: #334155; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${c.message}</p>
        </div>
        <p style="color: #64748b; font-size: 13px; margin: 20px 0 0;">Reply directly to <a href="mailto:${c.email}" style="color: #2d5a8e;">${c.email}</a></p>
      </div>
      <div style="background: #1e3a5f; padding: 16px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">ADHAR Adaption Center • Nigdi, Pune</p>
      </div>
    </div>
  `;
}

function buildContactAutoReplyHTML(name: string): string {
  return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #1e3a5f, #2d5a8e); padding: 32px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 28px;">ADHAR</h1>
        <p style="color: #cbd5e1; margin: 8px 0 0; font-size: 14px;">Adaption Center</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #1e3a5f; margin: 0 0 12px; font-size: 22px;">Hi ${name} 👋</h2>
        <p style="color: #475569; line-height: 1.7; font-size: 15px; margin: 0 0 16px;">
          Thank you for reaching out to <strong>ADHAR</strong>! We have received your message and our team will get back to you within <strong>24 hours</strong>.
        </p>
        <p style="color: #475569; line-height: 1.7; font-size: 15px; margin: 0 0 24px;">
          In the meantime, feel free to visit our center or call us at <strong>020-27656257</strong>.
        </p>
        <div style="background: #f0f9ff; border-left: 4px solid #2d5a8e; border-radius: 0 8px 8px 0; padding: 16px 20px;">
          <p style="color: #1e3a5f; font-size: 14px; font-weight: 600; margin: 0 0 8px;">📍 Our Address</p>
          <p style="color: #64748b; font-size: 13px; line-height: 1.7; margin: 0;">
            "Madhav Smruti"<br>
            Plot No. 48 &amp; 49, Sector 27,<br>
            Janata Vasahat, Pradhikaran,<br>
            Near Akurdi Railway Station,<br>
            Pune – 411044
          </p>
        </div>
        <p style="color: #475569; font-size: 15px; margin: 24px 0 0;">Warm regards,<br><strong>Team ADHAR</strong> 💙</p>
      </div>
      <div style="background: #1e3a5f; padding: 16px; text-align: center;">
        <p style="color: #94a3b8; font-size: 12px; margin: 0;">ADHAR Adaption Center • Nigdi, Pune • Since 1991</p>
      </div>
    </div>
  `;
}
