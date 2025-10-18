import * as React from 'react'
import {
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'

interface VerficationLayoutProps {
  username: string
  otp: string | number
}

const VerificationLayout = ({ username, otp }: VerficationLayoutProps) => {
  return (
    <Html>
      <Head>
        <title>Email Verification</title>
      </Head>
      <Preview>Heres your Verification Code</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello, {username}</Heading>
        </Row>
        <Row>
          <Text>Thank you for registering.</Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>==================================</Text>
        </Row>
      </Section>
    </Html>
  )
}

export { VerificationLayout }
