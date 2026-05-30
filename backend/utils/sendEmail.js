const transporter = require('../config/nodemailer');

const emailTemplates = {

    verify: (data) => ({
        subject: "Your MechanicDost OTP Verification Code",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #e05c00;">MechanicDost 🔧</h2>
                <p>Hi <b>${data.name || 'there'}</b>,</p>
                <p>Your OTP verification code is:</p>
                <h1 style="letter-spacing: 8px; color: #333;">${data.otp}</h1>
                <p>This OTP is valid for <b>5 minutes</b> only.</p>
                <p>If you did not request this, please ignore this email.</p>
            </div>`
    }),

    reset: (data) => ({
        subject: "MechanicDost — Password Reset OTP",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #e05c00;">MechanicDost 🔧</h2>
                <p>Hi <b>${data.name || 'there'}</b>,</p>
                <p>Your password reset OTP is:</p>
                <h1 style="letter-spacing: 8px; color: #333;">${data.otp}</h1>
                <p>This OTP is valid for <b>5 minutes</b> only.</p>
                <p>If you did not request this, please secure your account.</p>
            </div>`
    }),

    welcome: (data) => ({
        subject: "Welcome to MechanicDost!",
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #e05c00;">MechanicDost 🔧</h2>
                <p>Hi <b>${data.name || 'there'}</b>,</p>
                <p>Your account has been verified successfully! 🎉</p>
                <p>You can now login and use MechanicDost.</p>
                <p style="color: #e05c00; font-weight: bold;">Gaadi band? Dost ko bulao! 🏍️</p>
            </div>`
    })

}

const sendEmail = async ({email, type, ...data})=>{
    try{
        const template = emailTemplates[type]
        if(!template){
            throw new Error(`Invalid email type: ${type}`);
        }
        const {subject, html} = template(data)
        await transporter.sendMail({
            from: `"MechanicDost" <${process.env.MAIL_USER}>`,
            to: email,
            subject,
            html
        })
    }
    catch(err){
        console.error("Error sending email:", err);
        throw new Error("Failed to send email");
    }
}

module.exports = sendEmail