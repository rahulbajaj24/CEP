import { Router, Request, Response } from 'express';
import Contact from '../models/Contact.js';
import { sendContactNotification, sendContactAutoReply } from '../utils/mailer.js';

const router = Router();

// POST /api/contact — Submit a contact form message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message.',
      });
      return;
    }

    const contact = new Contact({ name, email, subject, message });
    const saved = await contact.save();

    console.log(`📩 Contact message from: ${saved.name} (${saved.email})`);

    // Notify ADHAR admin about the new message
    try {
      await sendContactNotification({
        name: saved.name,
        email: saved.email,
        subject: saved.subject,
        message: saved.message,
      });
    } catch (emailErr) {
      console.error('⚠️ Admin notification failed (message still saved):', emailErr);
    }

    // Send auto-reply to the user
    try {
      await sendContactAutoReply(saved.name, saved.email);
    } catch (emailErr) {
      console.error('⚠️ Auto-reply failed (message still saved):', emailErr);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been sent! We\'ll get back to you within 24 hours.',
      data: saved,
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e: any) => e.message);
      res.status(400).json({ success: false, message: messages.join(', ') });
      return;
    }

    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/contact — List all contact messages (admin)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
