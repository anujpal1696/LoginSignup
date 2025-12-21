import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>Your verification code is {otp}</Preview>

      <Body style={{ backgroundColor: "#f4f4f5" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            margin: "40px auto",
            borderRadius: "8px",
            maxWidth: "480px",
          }}
        >
          <Heading as="h2">Hello {username},</Heading>

          <Text>
            Thank you for signing up on <strong>KyaSceneHai</strong>.
          </Text>

          <Text>Your verification code is:</Text>

          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: "4px",
              margin: "16px 0",
            }}
          >
            {otp}
          </Text>

          <Text>
            If you did not request this code, you can safely ignore this email.
          </Text>

          <Text style={{ fontSize: "12px", color: "#6b7280", marginTop: "24px" }}>
            — KyaSceneHai Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
