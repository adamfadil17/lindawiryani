import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Konfigurasi transporter nodemailer menggunakan environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // Email untuk Admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Wedding Inquiry from ${formData.yourName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8B7355; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #8B7355; }
            .value { margin-top: 5px; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Wedding Inquiry</h1>
            </div>
            <div class="content">
              <h2>Contact Information</h2>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.yourName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${formData.yourEmail}</div>
              </div>
              <div class="field">
                <div class="label">Address:</div>
                <div class="value">${formData.yourAddress}</div>
              </div>
              <div class="field">
                <div class="label">Telephone:</div>
                <div class="value">${formData.telephone || 'Not provided'}</div>
              </div>

              <h2>Groom Information</h2>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.nameOfGroom || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Religion:</div>
                <div class="value">${formData.religionOfGroom || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Nationality:</div>
                <div class="value">${formData.nationalityOfGroom || 'Not provided'}</div>
              </div>

              <h2>Bride Information</h2>
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${formData.nameOfBride || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Religion:</div>
                <div class="value">${formData.religionOfBride || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Nationality:</div>
                <div class="value">${formData.nationalityOfBride || 'Not provided'}</div>
              </div>

              <h2>Wedding Details</h2>
              <div class="field">
                <div class="label">Wedding Date:</div>
                <div class="value">${formData.weddingDate || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Wedding Venue:</div>
                <div class="value">${formData.weddingVenue || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Number of Attendance:</div>
                <div class="value">${formData.numberOfAttendance || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Approximate Budget:</div>
                <div class="value">${formData.approximateWeddingBudget || 'Not provided'}</div>
              </div>

              <h2>Travel Information</h2>
              <div class="field">
                <div class="label">Hotel Name in Bali:</div>
                <div class="value">${formData.hotelNameInBali || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Arrival Date:</div>
                <div class="value">${formData.arrivalDate || 'Not provided'}</div>
              </div>
              <div class="field">
                <div class="label">Departure Date:</div>
                <div class="value">${formData.departureDate || 'Not provided'}</div>
              </div>

              <h2>Additional Information</h2>
              <div class="field">
                <div class="value">${formData.yourMessage || 'No additional information provided'}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was sent from the Linda Wiryani Events website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Email untuk Customer (Auto-reply)
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.yourEmail,
      subject: 'Thank You for Your Wedding Inquiry - Linda Wiryani Events',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #8B7355; color: white; padding: 30px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .greeting { font-size: 18px; margin-bottom: 20px; }
            .message { margin-bottom: 15px; }
            .signature { margin-top: 30px; font-style: italic; }
            .footer { text-align: center; margin-top: 30px; padding: 20px; background-color: #f0f0f0; }
            .contact-info { margin-top: 15px; }
            .contact-item { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Linda Wiryani Events</h1>
              <p>Bali Wedding Planner & Organizer</p>
            </div>
            <div class="content">
              <div class="greeting">
                Dear ${formData.yourName},
              </div>
              <div class="message">
                Thank you for reaching out to Linda Wiryani Events! We're thrilled that you're considering us to be part of your special day in beautiful Bali.
              </div>
              <div class="message">
                We have received your wedding inquiry and our team is excited to learn more about your vision. We will review your information carefully and get back to you within 24-48 hours with a personalized response.
              </div>
              <div class="message">
                Your dream Bali wedding is our priority, and we can't wait to help you create unforgettable memories.
              </div>
              <div class="signature">
                <p>Warm regards,</p>
                <p><strong>Linda Wiryani | Luxury Wedding Planner & Designer Team</strong></p>
              </div>
            </div>
            <div class="footer">
              <h3>Contact Us</h3>
              <div class="contact-info">
                <div class="contact-item">📧 lindawiryanievents@gmail.com</div>
                <div class="contact-item">📱 +62 811 3980 998</div>
                <div class="contact-item">📷 @lindawiryanievents</div>
              </div>
              <p style="margin-top: 15px; font-size: 12px; color: #666;">
                This is an automated response. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Kirim email ke admin
    await transporter.sendMail(adminMailOptions);
    
    // Kirim email ke customer
    await transporter.sendMail(customerMailOptions);

    return NextResponse.json(
      { message: 'Emails sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error: String(error) },
      { status: 500 }
    );
  }
}