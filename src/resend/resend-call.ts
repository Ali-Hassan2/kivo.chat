import { Resend } from 'resend'

const resend_uri = process.env.RESEND_API_KEY

if (!resend_uri) {
  throw new Error('Resend enviornment variables not found.')
}

const resend = new Resend(resend_uri)

export { resend }