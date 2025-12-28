import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.json();

    // Konfigurasi transporter nodemailer menggunakan environment variables
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #333;
              background-color: #f5f5f5;
              padding: 20px;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header { 
              background-color: #CDAA9E; 
              padding: 40px 30px; 
              text-align: center;
            }
            .header h1 { 
              color: #ffffff; 
              font-size: 28px; 
              font-weight: 600;
              margin-bottom: 8px;
              letter-spacing: 0.5px;
            }
            .header p { 
              color: #ffffff; 
              font-size: 14px;
              opacity: 0.95;
            }
            .content { 
              padding: 40px 30px;
            }
            .section { 
              margin-bottom: 35px;
            }
            .section-title { 
              font-size: 18px; 
              font-weight: 600; 
              color: #CDAA9E; 
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 2px solid #CDAA9E;
            }
            .field { 
              margin-bottom: 15px;
              padding: 12px;
              background-color: #fafafa;
              border-radius: 4px;
            }
            .label { 
              font-weight: 600; 
              color: #CDAA9E; 
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .value { 
              color: #333;
              font-size: 15px;
              margin-top: 5px;
            }
            .footer { 
              background-color: #CDAA9E;
              text-align: center; 
              padding: 25px 30px;
              border-top: 1px solid #e0e0e0;
            }
            .footer-text { 
              font-size: 13px; 
              color: #ffffff;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Wedding Inquiry</h1>
              <p>Linda Wiryani | Luxury Wedding Planner & Designer in Bali</p>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Contact Information</div>
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${formData.yourName}</div>
                </div>
                <div class="field">
                  <div class="label">Email</div>
                  <div class="value">${formData.yourEmail}</div>
                </div>
                <div class="field">
                  <div class="label">Address</div>
                  <div class="value">${formData.yourAddress}</div>
                </div>
                <div class="field">
                  <div class="label">Telephone</div>
                  <div class="value">${
                    formData.telephone || "Not provided"
                  }</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Groom Information</div>
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${
                    formData.nameOfGroom || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Religion</div>
                  <div class="value">${
                    formData.religionOfGroom || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Nationality</div>
                  <div class="value">${
                    formData.nationalityOfGroom || "Not provided"
                  }</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Bride Information</div>
                <div class="field">
                  <div class="label">Name</div>
                  <div class="value">${
                    formData.nameOfBride || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Religion</div>
                  <div class="value">${
                    formData.religionOfBride || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Nationality</div>
                  <div class="value">${
                    formData.nationalityOfBride || "Not provided"
                  }</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Wedding Details</div>
                <div class="field">
                  <div class="label">Wedding Date</div>
                  <div class="value">${
                    formData.weddingDate || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Wedding Venue</div>
                  <div class="value">${
                    formData.weddingVenue || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Number of Attendance</div>
                  <div class="value">${
                    formData.numberOfAttendance || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Approximate Budget</div>
                  <div class="value">${
                    formData.approximateWeddingBudget || "Not provided"
                  }</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Travel Information</div>
                <div class="field">
                  <div class="label">Hotel Name in Bali</div>
                  <div class="value">${
                    formData.hotelNameInBali || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Arrival Date</div>
                  <div class="value">${
                    formData.arrivalDate || "Not provided"
                  }</div>
                </div>
                <div class="field">
                  <div class="label">Departure Date</div>
                  <div class="value">${
                    formData.departureDate || "Not provided"
                  }</div>
                </div>
              </div>

              <div class="section">
                <div class="section-title">Their Story & Vision</div>
                <div class="field">
                  <div class="value">${
                    formData.yourMessage || "No additional information provided"
                  }</div>
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

    // Email untuk Customer (Auto-reply)
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: formData.yourEmail,
      subject: "Thank You for Your Enquiry",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6; 
              color: #333;
              background-color: #f5f5f5;
              padding: 20px;
            }
            .email-container { 
              max-width: 600px; 
              margin: 0 auto; 
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .header { 
              background-color: #CDAA9E; 
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
              color: #ffffff; 
              font-size: 32px; 
              font-weight: 600;
              margin-bottom: 8px;
              letter-spacing: 0.5px;
            }
            .header p { 
              color: #ffffff; 
              font-size: 15px;
              opacity: 0.95;
            }
            .content { 
              padding: 50px 40px;
            }
            .greeting { 
              font-size: 24px; 
              font-weight: 600;
              color: #333;
              margin-bottom: 25px;
            }
            .message { 
              font-size: 16px;
              color: #555;
              margin-bottom: 20px;
              line-height: 1.8;
            }
            .highlight-box {
              background-color: #fafafa;
              border-left: 4px solid #CDAA9E;
              padding: 20px;
              margin: 30px 0;
              border-radius: 4px;
            }
            .highlight-box p {
              color: #666;
              font-size: 15px;
              margin: 0;
            }
            .signature { 
              margin-top: 40px;
              padding-top: 30px;
              border-top: 1px solid #e0e0e0;
            }
            .signature p { 
              font-size: 15px;
              color: #666;
              margin-bottom: 8px;
            }
            .signature strong { 
              color: #CDAA9E;
              font-size: 16px;
            }
            .footer { 
              background-color: #CDAA9E;
              padding: 40px 30px;
              text-align: center;
            }
            .footer h3 { 
              color: #ffffff;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 20px;
            }
            .contact-info { 
              margin: 20px 0;
            }
            .contact-item { 
              color: #ffffff;
              font-size: 14px;
              margin: 10px 0;
            }
            .social-links {
              margin-top: 25px;
              padding-top: 25px;
              border-top: 1px solid #ffffff;
            }
            .disclaimer { 
              margin-top: 20px;
              padding-top: 20px;
              border-top: 1px solid #ffffff;
              font-size: 12px; 
              color: #ffffff;
              line-height: 1.5;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="https://res.cloudinary.com/dzerxindp/image/upload/v1766920272/logo-white_lihqc1.png" alt="Linda Wiryani Logo" class="logo">
              <h1>Linda Wiryani</h1>
              <p>Luxury Wedding Planner and Designer in Bali</p>
            </div>
            
            <div class="content">
              <div class="greeting">
                Dear ${formData.yourName},
              </div>
              
              <div class="message">
                Thank you for sharing your wedding vision with us. At Linda Wiryani Design & Event Planning, we craft timeless, artfully designed weddings that celebrate your unique love story.
              </div>
              
              <div class="message">
                Our team will review your details and be in touch shortly with ideas to create an unforgettable wedding experience in Bali.
              </div>
              
              <div class="highlight-box">
                <p>✨ <strong>Explore Our World</strong></p>
                <p>Discover our inspirations and curated experiences at <a href="https://www.lindawiryani.com" style="color: #CDAA9E; text-decoration: none; font-weight: 600;">www.lindawiryani.com</a></p>
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
