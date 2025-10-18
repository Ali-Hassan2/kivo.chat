import { VerificationLayout } from '@/email'
import { resend } from '@/resend'
import { ResendType } from './types/resend-type'

interface SendEmailProps {
  email?: string
  username: string
  verifyCode: string
}

const sendEmail = async ({
  email,
  username,
  verifyCode,
}: SendEmailProps): Promise<ResendType> => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: 'alihassan26032004@gmail.com',
      subject: 'Your Verification Code',
      react: VerificationLayout({ username, otp: verifyCode }),
    })
    if (error) {
      console.error('[SendEmail] Error sending email:', error)
      return {
        statusCode: 400,
        success: false,
        message: 'Failed to send verification code.',
        timestamps: new Date().toISOString(),
        error: {
          name: error?.name,
          message: error?.message,
        },
      }
    }
    console.log('[SendEmail] Email sent:', data)
    console.log('[SendEmail] Verification code:', verifyCode)
    return {
      statusCode: 200,
      success: true,
      message: 'Verification code sent successfully.',
      timestamps: new Date().toISOString(),
      data,
    }
  } catch (err: any) {
    console.error('[SendEmail] Exception:', err)
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error while sending verification code.',
      timestamps: new Date().toISOString(),
      error: {
        name: err?.name,
        message: err?.message,
        stack: err?.stack,
      },
    }
  }
}

export { sendEmail }
