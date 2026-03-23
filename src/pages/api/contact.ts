import type { APIRoute } from 'astro';
import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const phone = formData.get('phone')?.toString() || '';
    const subject = formData.get('subject')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'We Buy Your Junk <noreply@techlts.com>',
      to: ['marketing@techlts.com', 'akai@techlts.com', 'cllarocque@webuyyourjunk.org'],
      replyTo: email,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0077B5; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 24px; border: 1px solid #e9ecef; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057; width: 120px;">Name:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; color: #212529;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;"><a href="mailto:${email}" style="color: #0077B5;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Phone:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${phone || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; color: #495057;">Interest:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">${subject}</td>
              </tr>
            </table>
            
            <div style="margin-top: 24px;">
              <p style="font-weight: bold; color: #495057; margin-bottom: 8px;">Message:</p>
              <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #dee2e6; color: #212529; line-height: 1.6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
          </div>
          
          <div style="background: #1a1a2e; padding: 16px 24px; border-radius: 0 0 12px 12px; text-align: center;">
            <p style="color: #6c757d; margin: 0; font-size: 12px;">
              This message was sent from the We Buy Your Junk website contact form.
            </p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Interest: ${subject}

Message:
${message}

---
Sent from We Buy Your Junk website contact form
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: data?.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
