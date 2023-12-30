import { Module } from '@nestjs/common';

import { ConfigModule, ConfigType } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import { EmailNoticeServicePort } from 'src/tour-reservation/application/ports/email-notice-service.port';
import noticeConfig from './config/notice.config';
import { EmailNoticeService } from './services/email-notice-service';

@Module({
  imports: [ConfigModule.forFeature(noticeConfig)],
  providers: [
    {
      provide: 'EMAIL_TRANSPORTER',
      useFactory: (config: ConfigType<typeof noticeConfig>) => {
        const transporter = createTransport(
          {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
              user: config.SMTP_AUTH_USER,
              pass: config.SMTP_AUTH_PW,
            },
          },
          {
            from: config.NO_REPLY_EMAIL_ADDRESS,
          },
        );

        return transporter;
      },
      inject: [noticeConfig.KEY],
    },
    { provide: EmailNoticeServicePort, useClass: EmailNoticeService },
  ],
  exports: [EmailNoticeServicePort],
})
export class NoticeModule {}
