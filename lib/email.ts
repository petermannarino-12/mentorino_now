import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'Mentorino <onboarding@resend.dev>'

export async function sendApplicationSubmitted(email: string, name: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Your Application Has Been Submitted',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Hi ${name},</h1>
        <p>Your application to Mentorino has been successfully submitted!</p>
        <p>Peter will review your application shortly. You'll receive an email notification once it's been reviewed.</p>
        <p>This typically takes 24-48 hours.</p>
        <br />
        <p>Best regards,<br/>Peter Mannarino</p>
      </div>
    `,
  })
}

export async function sendApplicationAccepted(email: string, name: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Congratulations! Your Application Has Been Accepted',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Congratulations ${name}!</h1>
        <p>Your application to Mentorino has been <strong>accepted</strong>!</p>
        <p>You can now create your account to access the dashboard and start your mentorship journey.</p>
        <p style="margin-top: 20px;">Click the button below to create your account:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/auth?email=${encodeURIComponent(email)}" 
           style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
          Create Your Account
        </a>
        <br />
        <p>Best regards,<br/>Peter Mannarino</p>
      </div>
    `,
  })
}

export async function sendApplicationRejected(email: string, name: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Application Update from Mentorino',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Hi ${name},</h1>
        <p>Thank you for your interest in Mentorino.</p>
        <p>Unfortunately, after careful consideration, your application was not accepted at this time.</p>
        <p>This decision was not made lightly. We encourage you to apply again in the future if circumstances change.</p>
        <br />
        <p>Best regards,<br/>Peter Mannarino</p>
      </div>
    `,
  })
}

export async function sendPasswordReset(email: string, resetToken: string) {
  return resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #000;">Reset Your Password</h1>
        <p>Click the button below to reset your password:</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}" 
           style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">
          Reset Password
        </a>
        <p>This link expires in 1 hour.</p>
        <br />
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  })
}