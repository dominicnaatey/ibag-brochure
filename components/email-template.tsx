import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

interface ContactEmailProps {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  submittedAt?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const ContactEmail = ({
  firstName = 'John',
  lastName = 'Doe',
  email = 'john.doe@example.com',
  phone = '+233 123 456 789',
  subject = 'General Inquiry',
  message = 'This is a sample message from the contact form.',
  submittedAt = new Date().toLocaleString(),
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New Contact Form Submission from {firstName} {lastName}</Preview>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${baseUrl}/ibag_logo.png`}
            width="120"
            height="60"
            alt="IBAG Ghana"
          />
        </Section>
        <Heading style={h1}>New Contact Form Submission</Heading>
        <Text style={heroText}>
          You have received a new contact form submission from the IBAG Ghana website.
        </Text>

        <Section style={contactInfoBox}>
          <Heading style={sectionHeading}>Contact Information</Heading>
          <Text style={contactText}>
            <strong>Name:</strong> {firstName} {lastName}
          </Text>
          <Text style={contactText}>
            <strong>Email:</strong> {email}
          </Text>
          <Text style={contactText}>
            <strong>Phone:</strong> {phone || 'Not provided'}
          </Text>
          <Text style={contactText}>
            <strong>Subject:</strong> {subject}
          </Text>
        </Section>

        <Section style={messageBox}>
          <Heading style={sectionHeading}>Message</Heading>
          <Text style={messageText}>
            {message}
          </Text>
        </Section>

        <Text style={text}>
          This email was automatically generated from the IBAG Ghana website contact form.
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: '66%' }}>
              <Img
                src={`${baseUrl}/ibag_logo.png`}
                width="120"
                height="60"
                alt="IBAG Ghana"
              />
            </Column>
            <Column align="right">
              <Text style={submissionTime}>
                Submitted: {submittedAt}
              </Text>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link
            style={footerLink}
            href="https://ibag-ghana.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://ibag-ghana.com/contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://ibag-ghana.com/members"
            target="_blank"
            rel="noopener noreferrer"
          >
            Members
          </Link>
          <Text style={footerText}>
            ©2024 Italian Business Association of Ghana (IBAG). <br />
            Connecting Italian Heritage to Ghana's Business Landscape. <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

ContactEmail.PreviewProps = {
  firstName: 'Mario',
  lastName: 'Rossi',
  email: 'mario.rossi@example.com',
  phone: '+233 123 456 789',
  subject: 'Partnership Inquiry',
  message: 'I am interested in learning more about IBAG membership and potential business partnerships in Ghana.',
  submittedAt: new Date().toLocaleString(),
} as ContactEmailProps;

export default ContactEmail;

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const footerLink = {
  color: '#007bff',
  textDecoration: 'underline',
};

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
};

const submissionTime = {
  fontSize: '12px',
  color: '#6c757d',
  textAlign: 'right' as const,
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '0px 20px',
};

const logoContainer = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
  color: '#333',
};

const contactInfoBox = {
  background: '#f8f9fa',
  borderRadius: '8px',
  marginBottom: '30px',
  padding: '30px 20px',
};

const messageBox = {
  background: '#ffffff',
  border: '1px solid #dee2e6',
  borderRadius: '8px',
  marginBottom: '30px',
  padding: '30px 20px',
};

const sectionHeading = {
  color: '#007bff',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 15px 0',
  padding: '0',
};

const contactText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
};

const messageText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const text = {
  color: '#6c757d',
  fontSize: '12px',
  lineHeight: '18px',
  marginBottom: '30px',
};