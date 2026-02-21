import { VerificationLayout } from '@/email'
import { getResendClient } from '@/resend'
import type { ResendType } from './types/resend-type'

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
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email ?? 'alihassan26032004@gmail.com',
      subject: 'Your Verification Code',
      react: VerificationLayout({ username, otp: verifyCode }),
    })
    if (error) {
      return {
        statusCode: 400,
        success: false,
        message: error?.message || 'Failed to send email',
        timestamps: new Date().toISOString(),
      }
    }
    return {
      statusCode: 200,
      success: true,
      message: 'Verification code sent successfully',
      timestamps: new Date().toISOString(),
      data,
    }
  } catch (err: any) {
    return {
      statusCode: 500,
      success: false,
      message: 'Unexpected error while sending verification code',
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
