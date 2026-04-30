import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Fungsi untuk verifikasi reCAPTCHA
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is not set");
    return false;
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

// Helper: render array as comma-separated or "Not provided"
function listOrEmpty(arr: string[] | undefined | null): string {
  if (!arr || arr.length === 0) return "Not provided";
  return arr.join(", ");
}

export async function POST(req: Request) {
  try {
    const formData = await req.json();
    const { recaptchaToken, ...emailData } = formData;

    // Verifikasi reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { message: "reCAPTCHA token is required" },
        { status: 400 }
      );
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);

    if (!isValidRecaptcha) {
      return NextResponse.json(
        { message: "reCAPTCHA verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Konfigurasi transporter nodemailer menggunakan environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    // ── Email untuk Admin ──────────────────────────────────────────────────
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Wedding Enquiry from ${emailData.fullName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light only">
          <meta name="supported-color-schemes" content="light">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
              line-height: 1.6; 
              color: #333333 !important;
              background-color: #f5f5f5 !important;
              padding: 20px;
              -webkit-text-size-adjust: 100%;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff !important;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header { 
              background-color: #CDAA9E !important; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 { 
              color: #ffffff !important; 
              font-size: 24px; 
              font-weight: 400;
              margin-bottom: 8px;
              letter-spacing: 1.5px;
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
            }
            .header p { 
              color: #ffffff !important; 
              font-size: 15px;
              font-weight: 400;
              letter-spacing: 0.5px;
            }
            .content { 
              padding: 40px 30px;
              background-color: #ffffff !important;
            }
            .section { 
              margin-bottom: 35px;
            }
            .section-title { 
              font-size: 20px; 
              font-weight: 500; 
              color: #CDAA9E !important; 
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #CDAA9E;
              letter-spacing: 1px;
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
            }
            .field { 
              margin-bottom: 15px;
              padding: 12px;
              background-color: #fafafa !important;
              border-radius: 4px;
            }
            .label { 
              font-weight: 600; 
              color: #CDAA9E !important; 
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 5px;
            }
            .value { 
              color: #333333 !important;
              font-size: 16px;
              margin-top: 5px;
              font-weight: 400;
            }
            .footer { 
              background-color: #CDAA9E !important;
              text-align: center; 
              padding: 25px 30px;
              border-top: 1px solid #e0e0e0;
            }
            .footer-text { 
              font-size: 14px; 
              color: #ffffff !important;
              line-height: 1.5;
              font-weight: 400;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Wedding Enquiry</h1>
              <p>Linda Wiryani | Luxury Wedding Planner & Designer in Bali</p>
            </div>

            <div class="content">

              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="field">
                  <div class="label">Full Name</div>
                  <div class="value">${emailData.fullName || "Not provided"}</div>
                </div>
                <div class="field">
                  <div class="label">Email / WhatsApp</div>
                  <div class="value">${emailData.emailOrWhatsapp || "Not provided"}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Wedding Details</div>
                <div class="field">
                  <div class="label">Wedding Date / Preferred Month</div>
                  <div class="value">${emailData.weddingDate || "Not provided"}</div>
                </div>
                <div class="field">
                  <div class="label">Number of Guests</div>
                  <div class="value">${emailData.numberOfGuests || "Not provided"}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Wedding Location Interest</div>
                <div class="field">
                  <div class="value">${listOrEmpty(emailData.weddingLocationInterest)}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Wedding Style</div>
                <div class="field">
                  <div class="value">${emailData.weddingStyle || "Not provided"}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Estimated Budget</div>
                <div class="field">
                  <div class="value">${emailData.estimatedBudget || "Not provided"}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Services Needed</div>
                <div class="field">
                  <div class="value">${listOrEmpty(emailData.servicesNeeded)}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Venue Status</div>
                <div class="field">
                  <div class="label">Have You Secured a Venue?</div>
                  <div class="value">${emailData.venueSecured || "Not provided"}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Their Vision</div>
                <div class="field">
                  <div class="value">${emailData.yourVision || "No additional information provided"}</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">How They Found Us</div>
                <div class="field">
                  <div class="value">${emailData.howDidYouFindUs || "Not provided"}</div>
                </div>
              </div>

            </div>

            <div class="footer">
              <p class="footer-text">
                This email was sent from the Linda Wiryani Events website contact form.<br>
                Received on ${new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // ── Email untuk Customer (Auto-reply) ──────────────────────────────────
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: emailData.emailOrWhatsapp,
      subject: "Thank You for Your Enquiry",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light only">
          <meta name="supported-color-schemes" content="light">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
              line-height: 1.6; 
              color: #333333 !important;
              background-color: #f5f5f5 !important;
              padding: 20px;
              -webkit-text-size-adjust: 100%;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff !important;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header { 
              background-color: #CDAA9E !important; 
              padding: 50px 30px; 
              text-align: center;
            }
            .logo {
              max-width: 150px;
              height: auto;
              margin: 0 auto 20px;
              display: block;
            }
            .header h1 { 
              color: #ffffff !important; 
              font-size: 24px; 
              font-weight: 400;
              margin-bottom: 8px;
              letter-spacing: 2px;
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
            }
            .header p { 
              color: #ffffff !important; 
              font-size: 16px;
              font-weight: 400;
              letter-spacing: 0.5px;
            }
            .content { 
              padding: 50px 40px;
              background-color: #ffffff !important;
            }
            .greeting { 
              font-size: 26px; 
              font-weight: 500;
              color: #333333 !important;
              margin-bottom: 25px;
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
            }
            .message { 
              font-size: 17px;
              color: #555555 !important;
              margin-bottom: 20px;
              line-height: 1.8;
              font-weight: 400;
            }
            .highlight-box {
              background-color: #fafafa !important;
              border-left: 4px solid #CDAA9E;
              padding: 20px;
              margin: 30px 0;
              border-radius: 4px;
            }
            .highlight-box p {
              color: #666666 !important;
              font-size: 16px;
              margin: 0;
              font-weight: 400;
            }
            .highlight-box strong {
              font-weight: 600;
            }
            .highlight-box a {
              color: #CDAA9E !important;
              text-decoration: none;
              font-weight: 600;
            }
            .signature { 
              margin-top: 40px;
              padding-top: 30px;
              border-top: 1px solid #e0e0e0;
            }
            .signature p { 
              font-size: 16px;
              color: #666666 !important;
              margin-bottom: 8px;
              font-weight: 400;
            }
            .signature strong { 
              color: #CDAA9E !important;
              font-size: 18px;
              font-weight: 600;
            }
            .footer { 
              background-color: #CDAA9E !important;
              padding: 40px 30px;
              text-align: center;
            }
            .footer h3 { 
              color: #ffffff !important;
              font-size: 22px;
              font-weight: 500;
              margin-bottom: 20px;
              letter-spacing: 1px;
              font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
            }
            .contact-info { 
              margin: 20px 0;
            }
            .contact-item { 
              color: #ffffff !important;
              font-size: 15px;
              margin: 10px 0;
              font-weight: 400;
            }
            .disclaimer { 
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid rgba(255,255,255,0.3);
              font-size: 13px; 
              color: #ffffff !important;
              line-height: 1.5;
              font-weight: 400;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="https://res.cloudinary.com/dzerxindp/image/upload/v1766920272/logo-white_lihqc1.png" alt="Linda Wiryani Logo" class="logo">
              <p>Luxury Wedding Planner and Designer in Bali</p>
            </div>

            <div class="content">
              <div class="greeting">
                Dear ${emailData.fullName},
              </div>

              <div class="message">
                Thank you for sharing your wedding vision with us. At Linda Wiryani Design & Event Planning, we craft timeless, artfully designed weddings that celebrate your unique love story.
              </div>

              <div class="message">
                Our team will review your details and be in touch shortly with ideas to create an unforgettable wedding experience in Bali.
              </div>

              <div class="highlight-box">
                <p>✨ <strong>Explore Our World</strong></p>
                <p>Discover our inspirations and curated experiences at <a href="https://www.lindawiryani.com">www.lindawiryani.com</a></p>
              </div>

              <div class="signature">
                <p>Warm regards,</p>
                <p><strong>Linda Wiryani</strong></p>
                <p>Design and Event Planning</p>
              </div>
            </div>

            <div class="footer">
              <h3>Get in Touch</h3>
              <div class="contact-info">
                <div class="contact-item">📧 lindawiryanievents@gmail.com</div>
                <div class="contact-item">📱 +62 811 3980 998</div>
                <div class="contact-item">📷 @lindawiryanievents</div>
              </div>

              <div class="disclaimer">
                This is an automated confirmation email. Please do not reply directly to this message.<br>
                We look forward to connecting with you personally soon.
              </div>
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
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: String(error) },
      { status: 500 }
    );
  }
}