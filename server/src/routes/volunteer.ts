import { Router, Request, Response } from 'express';
import Volunteer from '../models/Volunteer.js';
import { sendVolunteerConfirmation, sendVolunteerNotificationToAdmin, sendOTPEmail, sendVolunteerSMS } from '../utils/mailer.js';
import { generateOTP, storeOTP, verifyOTP } from '../utils/otp.js';

const router = Router();

// POST /api/volunteer/send-otp — Send OTP to email for verification
router.post('/send-otp', async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ success: false, message: 'Email is required.' });
      return;
    }

    const otp = generateOTP();
    storeOTP(email, otp);

    const result = await sendOTPEmail(email, otp);

    console.log(`🔐 OTP sent to ${email}: ${otp}`);
    if (result && typeof result === 'string') console.log(`   Preview: ${result}`);

    res.json({
      success: true,
      message: 'OTP sent to your email. Please check your inbox.',
    });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ success: false, message: 'Failed to send OTP.' });
  }
});

// POST /api/volunteer — Register a new volunteer (requires OTP)
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, interest, location, otp } = req.body;

    if (!name || !email || !phone || !interest) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, phone, and interest.',
      });
      return;
    }

    if (!otp) {
      res.status(400).json({
        success: false,
        message: 'OTP is required. Please verify your email first.',
      });
      return;
    }

    // Verify OTP
    const otpResult = verifyOTP(email, otp);
    if (!otpResult.valid) {
      res.status(400).json({ success: false, message: otpResult.message });
      return;
    }

    const volunteer = new Volunteer({ name, email, phone, interest, location });
    const saved = await volunteer.save();

    console.log(`✅ Volunteer registered: ${saved.name} (${saved.email})`);

    // Send confirmation email
    let emailPreview: string | false | null = null;
    try {
      emailPreview = await sendVolunteerConfirmation({
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        interest: saved.interest,
        location: saved.location,
      });
    } catch (emailErr) {
      console.error('⚠️ Confirmation email failed (registration still saved):', emailErr);
    }

    // Send notification email to ADHAR admin
    try {
      await sendVolunteerNotificationToAdmin({
        name: saved.name,
        email: saved.email,
        phone: saved.phone,
        interest: saved.interest,
        location: saved.location,
      });
      console.log(`📧 Admin notification sent for volunteer: ${saved.name}`);
    } catch (adminErr) {
      console.error('⚠️ Admin notification email failed (registration still saved):', adminErr);
    }

    // Send SMS notification
    try {
      await sendVolunteerSMS(saved.phone, saved.name);
    } catch (smsErr) {
      console.error('⚠️ SMS send failed (registration still saved):', smsErr);
    }

    res.status(201).json({
      success: true,
      message: 'Email verified & volunteer registered successfully!',
      data: saved,
      emailPreview,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ success: false, message: messages.join(', ') });
      return;
    }

    console.error('Error saving volunteer:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/volunteer — List all volunteers
router.get('/', async (_req: Request, res: Response) => {
  try {
    const volunteers = await Volunteer.find().sort({ createdAt: -1 });
    res.json({ success: true, data: volunteers });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
