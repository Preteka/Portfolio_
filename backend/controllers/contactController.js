const { Contact, ContactMock } = require('../models/contactModel');
const nodemailer = require('nodemailer');

// ─────────────────────────────────────────────
// Setup Nodemailer transporter using Gmail SMTP
// Reads credentials from .env (SMTP_USER, SMTP_PASS)
// ─────────────────────────────────────────────
const getTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    // Real Gmail transporter using App Password
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,       // STARTTLS
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,   // your Gmail address
        pass: process.env.SMTP_PASS,   // your Gmail App Password (16 chars)
      },
      tls: {
        rejectUnauthorized: false,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
    });
  }

  // Fallback: log emails to console if env vars aren't set
  console.warn('[Email] SMTP_USER/SMTP_PASS not set — using console fallback');
  return {
    sendMail: async (options) => {
      console.log('──── MOCK EMAIL ────────────────────────────────');
      console.log(`To:      ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Body:    ${options.text || '(HTML)'}`);
      console.log('────────────────────────────────────────────────');
      return { messageId: 'mock-' + Math.random().toString(36).slice(2) };
    }
  };
};

// ─────────────────────────────────────────────
// POST /api/contact  — Handle contact form
// ─────────────────────────────────────────────
const sendContactMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address.' });
  }

  try {
    // ── Save to DB (or mock if DB not connected) ──────────────
    let savedMessage;
    const isDbConnected = req.app.get('dbConnected');
    if (isDbConnected) {
      savedMessage = await Contact.create({ name, email, subject, message });
    } else {
      savedMessage = await ContactMock.create({ name, email, subject, message });
    }

    const transporter = getTransporter();

    // ── Email 1: Notify YOU (portfolio owner) ─────────────────
    const ownerMailOptions = {
      from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
      subject: `[Portfolio] New Message: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e4e4e7; border-radius: 8px;">
          <h2 style="color: #7c3aed; margin-bottom: 20px;">📬 New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #f4f4f5; padding: 15px; border-radius: 6px; margin-top: 15px;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="font-size: 12px; color: #a1a1aa; margin-top: 30px;">Sent from your portfolio contact form.</p>
        </div>
      `
    };

    // ── Email 2: Auto-reply to the VISITOR ───────────────────
    const visitorMailOptions = {
      from: `"Preteka" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name}!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #7c3aed; border-radius: 8px; background-color: #09090b; color: #ffffff;">
          <h2 style="color: #38bdf8; margin-bottom: 10px;">Hello ${name} 👋</h2>
          <p>Thank you for getting in touch! I have received your message about <strong>"${subject}"</strong>.</p>
          <p>I'll review it and get back to you as soon as possible (usually within 24–48 hours).</p>
          <div style="border-left: 3px solid #7c3aed; padding-left: 15px; margin: 20px 0; color: #a1a1aa; font-style: italic;">
            "Building responsive web applications with clean code and exceptional user experiences."
          </div>
          <p>Best regards,<br/><strong>Preteka A T</strong><br/>Software Engineer / Full Stack Developer</p>
          <div style="border-top: 1px solid #18181b; padding-top: 15px; margin-top: 30px; font-size: 11px; color: #71717a;">
            This is an automated confirmation. Please do not reply directly to this email.
          </div>
        </div>
      `
    };

    // Send both emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(visitorMailOptions);

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! A confirmation email has been sent to you.',
      data: savedMessage
    });

  } catch (error) {
    console.error('[Contact Error]', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.'
    });
  }
};

module.exports = { sendContactMessage };
