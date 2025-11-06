// Email service using Resend
// To use: Add RESEND_API_KEY to your .env.local

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailOptions) {
  // Check if Resend is configured
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured. Email not sent.');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    // Dynamic import to avoid bundling issues
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'AFRILingua DAO <onboarding@resend.dev>', // Change this to your verified domain
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

export async function sendRegistrationConfirmationEmail(
  email: string,
  name: string,
  role: string,
  verificationToken: string,
  locale: string = 'en'
) {
  // Get base URL from environment or use localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const verificationLink = `${baseUrl}/${locale}/verify-email?token=${verificationToken}`;
  
  const subject = 'Welcome to AFRILingua DAO - Verify Your Email';
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 5px; margin: 20px 0; font-weight: bold; }
          .button:hover { background: #059669; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          .verify-section { background: #ffffff; border: 2px solid #10b981; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center; }
          .warning { color: #dc2626; font-size: 12px; margin-top: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌍 AFRILingua DAO</h1>
          </div>
          <div class="content">
            <h2>Welcome, ${name}!</h2>
            <p>Thank you for registering with AFRILingua DAO. Your registration has been successfully received.</p>
            
            <div class="verify-section">
              <h3>Verify Your Email Address</h3>
              <p>Please verify your email address to complete your registration and receive updates from our community.</p>
              <a href="${verificationLink}" class="button">Verify Email Address</a>
              <p class="warning">This link will expire in 7 days.</p>
            </div>
            
            <p><strong>Or copy this link:</strong><br>
            <a href="${verificationLink}" style="color: #10b981; word-break: break-all;">${verificationLink}</a></p>
            
            <h3>Registration Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Role:</strong> ${role}</li>
            </ul>
            
            <p>We're excited to have you join our community dedicated to preserving and promoting African languages through decentralized governance.</p>
            
            <p>You'll receive updates about:</p>
            <ul>
              <li>Community initiatives</li>
              <li>Language preservation projects</li>
              <li>DAO governance proposals</li>
              <li>Upcoming events and opportunities</li>
            </ul>
            
            <div class="footer">
              <p>© 2025 AFRILingua DAO. All rights reserved.</p>
              <p>Empowering African languages through decentralized governance.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({ to: email, subject, html });
}

