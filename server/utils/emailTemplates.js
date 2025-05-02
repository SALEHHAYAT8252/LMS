export function generateVerificationOtpEmailTemplate(otp) {
  //     return `<div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
  //     <!-- Header with gradient -->
  //     <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
  //         <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600;">Email Verification</h1>
  //         <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 16px;">One last step to secure your account</p>
  //     </div>

  //     <!-- Main Content -->
  //     <div style="padding: 30px;">
  //         <p style="margin: 0 0 20px; color: #4a5568; line-height: 1.6;">Hello there,</p>
  //         <p style="margin: 0 0 25px; color: #4a5568; line-height: 1.6;">Thank you for registering! Please use the following OTP to verify your email address:</p>

  //         <!-- OTP Box with animation effect -->
  //         <div style="background: white; border-radius: 8px; padding: 25px; margin: 0 auto 30px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px dashed #667eea; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.05)';">
  //             <p style="margin: 0 0 10px; color: #718096; font-size: 14px;">Your verification code</p>
  //             <div style="font-size: 32px; font-weight: 700; letter-spacing: 5px; color: #2d3748; background: #f8fafc; padding: 12px; border-radius: 6px; display: inline-block; border: 1px solid #e2e8f0;">
  //                ${otp}
  //             </div>
  //         </div>

  //         <p style="margin: 0 0 25px; color: #718096; font-size: 14px; text-align: center;">
  // <span style="color: #e53e3e; font-weight: 500;">⚠️ Expires in 10 minutes</span><br>
  // For security reasons, please do not share this code with anyone.
  //         </p>

  //         <!-- Button -->
  //         <div style="text-align: center; margin-top: 30px;">
  //             <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3); transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.4)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.3)'; this.style.transform='translateY(0)';">Verify Email Address</a>
  //         </div>
  //     </div>

  //     <!-- Footer -->
  //     <div style="background: #2d3748; padding: 20px; text-align: center; color: rgba(255,255,255,0.7); font-size: 12px;">
  //         <p style="margin: 0;">© 2023 YourBrand. All rights reserved.</p>
  //         <p style="margin: 8px 0 0;">123 Business Street, City, Country</p>
  //         <p style="margin: 8px 0 0;">
  //             <a href="#" style="color: #a0aec0; text-decoration: none; margin: 0 10px;">Help Center</a>
  //             <a href="#" style="color: #a0aec0; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
  //         </p>
  //     </div>
  // </div>`

  return `<div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 500px; margin: 0 auto; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%); border-radius: 10px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.08);">
    <!-- Compact Header -->
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
        <h1 style="margin: 0; color: white; font-size: 22px; font-weight: 600;">Verify Your Email</h1>
    </div>
    
    <!-- Compact Content -->
    <div style="padding: 20px 25px;">
        <p style="margin: 0 0 15px; color: #4a5568; font-size: 14px; line-height: 1.5;">Please use this OTP to complete your verification:</p>
        
        <!-- Compact OTP Box -->
        <div style="background: white; border-radius: 6px; padding: 15px; margin: 0 auto 20px; text-align: center; box-shadow: 0 3px 10px rgba(0,0,0,0.05); border: 1px dashed #667eea;">
            <div style="font-size: 26px; font-weight: 700; letter-spacing: 4px; color: #2d3748; padding: 8px 0;">
                ${otp}
            </div>
        </div>
        
        <p style="margin: 0 0 15px; color: #718096; font-size: 12px; text-align: center;">
            <span style="color: #e53e3e;">⚠️ Expires in 15 minutes</span><br>
            For security reasons, please do not share this code with anyone.
        </p>
        
        <!-- Compact Button -->
        <div style="text-align: center; margin-top: 20px;">
            <a href="#" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 10px 25px; border-radius: 50px; font-weight: 600; font-size: 14px; box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);">Verify Now</a>
        </div>
    </div>
    
    <!-- Compact Footer -->
    <div style="background: #2d3748; padding: 15px; text-align: center; color: rgba(255,255,255,0.7); font-size: 11px;">
        <p style="margin: 0;">© 2025 stackzyx . All rights reserved.</p>
    </div>
</div>`;
}

export function genrateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        <!-- Header with gradient -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; color: white; font-size: 28px; font-weight: 600;">Password Reset Request</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 16px;">Secure your account in just one click</p>
        </div>
        
        <!-- Main Content -->
        <div style="padding: 30px;">
            <p style="margin: 0 0 20px; color: #4a5568; line-height: 1.6;">Hello there,</p>
            <p style="margin: 0 0 25px; color: #4a5568; line-height: 1.6;">We received a request to reset your password. Click the button below to create a new password:</p>
            
            <!-- Button -->
            <div style="text-align: center;">
                <a href="${resetPasswordUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(102,126,234,0.3); transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 6px 20px rgba(102,126,234,0.4)'; this.style.transform='translateY(-2px)';
                onmouseout="this.style.boxShadow='0 4px 15px rgba(102,126,234,0.3)'; this.style.transform='translateY(0)';">Reset Password</a>
                </div>
            <p style="margin: 0 0 25px; color: #718096; font-size: 14px; text-align: center;">
                If you didn't request this, please ignore this email. Your password won't change until you create a new one.
                </p>
                <p style="margin: 0 0 25px; color: #718096; font-size: 14px; text-align: center;">
                For security reasons, this link will expire in 15 minutes.
                </p>
                <p style="margin: 0 0 25px; color: #718096; font-size: 14px; text-align: center;">
                If you have any questions, feel free to contact our support team.
                </p>
                <p style="margin: 0 0 25px; color: #718096; font-size: 14px; text-align: center;">
                Thank you for being a part of our community!<br>
                The stackzyx Team
                <p >${resetPasswordUrl}</p>
                </p>
                </div>
                <!-- Footer -->
                <div style="background: #2d3748; padding: 20px; text-align: center; color: rgba(255,255,255,0.7); font-size: 12px;">
                    <p style="margin: 0;">© 2023 stackzyx. All rights reserved.</p>
                    <p style="margin: 8px 0 0;">123 Business Street, City, Country</p>
                    <p style="margin: 8px 0 0;">
                        <a href="#" style="color: #a0aec0; text-decoration: none; margin: 0 10px;">Help Center</a>
                        <a href="#" style="color: #a0aec0; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                    </p>
                </div>
                
                `
                ;
}
