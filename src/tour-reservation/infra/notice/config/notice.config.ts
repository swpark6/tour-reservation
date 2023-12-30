import { registerAs } from '@nestjs/config';

export default registerAs('notice', () => ({
  SMTP_AUTH_USER: process.env.SMTP_AUTH_USER || 'no-reply@test.com',
  SMTP_AUTH_PW: process.env.SMTP_AUTH_PW,
  NO_REPLY_EMAIL_ADDRESS:
    process.env.NO_REPLY_EMAIL_ADDRESS || 'no-reply@test.com',
}));
