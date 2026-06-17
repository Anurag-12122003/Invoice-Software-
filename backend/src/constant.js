export const getVerificationEmailHtml = (name, verificationCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Account - Invoice Pro</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 550px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
        
        <!-- HEADER / LOGO SECTION -->
        <tr>
          <td align="center" style="padding: 40px 20px 20px 20px; background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%); border-bottom: 1px solid #f1f5f9;">
            <!-- Apni image ka uploaded public link 'src' me dalein -->
            ${image}
            <h1 style="margin: 0; font-size: 24px; color: #0f172a; font-weight: 700; letter-spacing: -0.5px;">Invoice Pro</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">A modern invoice solution</p>
          </td>
        </tr>

        <!-- CONTENT SECTION -->
        <tr>
          <td style="padding: 40px 35px 30px 35px;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #334155;">Hi <strong>${name}</strong>,</p>
            <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">Thank you for choosing Invoice Pro! We are excited to help you manage your business invoicing seamlessly. Please verify your email address by using the 6-digit activation code below:</p>
            
            <!-- OTP CODE BOX -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
              <tr>
                <td align="center" style="background-color: #eff6ff; border: 1px dashed #bfdbfe; padding: 18px; border-radius: 8px;">
                  <span style="font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #1d4ed8; font-family: 'Courier New', Courier, monospace;">${verificationCode}</span>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 20px; color: #64748b; font-style: italic;">This verification code is secure and will expire in <strong>15 minutes</strong>. Please do not share this code with anyone.</p>
            
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0 20px 0;">
            
            <p style="margin: 0; font-size: 14px; color: #475569;">Best regards,<br><strong style="color: #0f172a;">The Invoice Pro Team</strong></p>
          </td>
        </tr>

        <!-- FOOTER SECTION -->
        <tr>
          <td align="center" style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} Invoice Pro. All rights reserved.</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">If you did not create an account, no further action is required.</p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
};

export const getResetPasswordEmailHtml = (name, resetCode) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password - Invoice Pro</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 550px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);">
        
        <!-- HEADER / LOGO SECTION -->
        <tr>
          <td align="center" style="padding: 40px 20px 20px 20px; background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%); border-bottom: 1px solid #f1f5f9;">
            <!-- Apni image ka uploaded public link 'src' me dalein -->
            ${image}
            <h1 style="margin: 0; font-size: 24px; color: #0f172a; font-weight: 700; letter-spacing: -0.5px;">Invoice Pro</h1>
            <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">A modern invoice solution</p>
          </td>
        </tr>

        <!-- CONTENT SECTION -->
        <tr>
          <td style="padding: 40px 35px 30px 35px;">
            <p style="margin: 0 0 16px 0; font-size: 16px; line-height: 24px; color: #334155;">Hello <strong>${name}</strong>,</p>
            <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 24px; color: #475569;">We received a request to reset the password linked to your Invoice Pro account. Please use the following 6-digit recovery code to complete the process:</p>
            
            <!-- OTP CODE BOX -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
              <tr>
                <td align="center" style="background-color: #fef2f2; border: 1px dashed #fca5a5; padding: 18px; border-radius: 8px;">
                  <span style="font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #dc2626; font-family: 'Courier New', Courier, monospace;">${resetCode}</span>
                </td>
              </tr>
            </table>

            <p style="margin: 0 0 24px 0; font-size: 13px; line-height: 20px; color: #64748b;">This reset code is strictly valid for <strong>15 minutes</strong>. If you did not initiate this change, your account is perfectly safe and you can safely ignore this email.</p>
            
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 30px 0 20px 0;">
            
            <p style="margin: 0; font-size: 14px; color: #475569;">Best regards,<br><strong style="color: #0f172a;">The Invoice Pro Team</strong></p>
          </td>
        </tr>

        <!-- FOOTER SECTION -->
        <tr>
          <td align="center" style="padding: 20px; background-color: #f8fafc; border-top: 1px solid #f1f5f9;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} Invoice Pro. All rights reserved.</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #cbd5e1;">Securing your modern financial workflows.</p>
          </td>
        </tr>

      </table>
    </body>
    </html>
  `;
};

const  image=`<img src="https://ibb.co/PstW5tXC" alt="Invoice Pro Logo" width="80" height="80" style="display: block; margin-bottom: 12px; border-radius: 16px;">`;
// <img src="YOUR_UPLOADED_LOGO_IMAGE_URL" alt="Invoice Pro Logo" width="80" height="80" style="display: block; margin-bottom: 12px; border-radius: 16px;">
