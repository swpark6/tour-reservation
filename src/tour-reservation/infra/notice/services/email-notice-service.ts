import { Inject, Logger, OnModuleInit } from '@nestjs/common';
import { Transporter } from 'nodemailer';
import { EmailNoticeServicePort } from 'src/tour-reservation/application/ports/email-notice-service.port';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

export class EmailNoticeService
  implements OnModuleInit, EmailNoticeServicePort
{
  private readonly logger = new Logger(EmailNoticeService.name);
  private senderEmailAddress: string;

  constructor(
    @Inject('EMAIL_TRANSPORTER') private readonly transporter: Transporter,
  ) {}

  onModuleInit() {
    this.senderEmailAddress = this.transporter.options['auth']['user'];
    this.logger.log(
      `이메일 알림 서비스 초기화 완료, 이메일 계정: ${this.senderEmailAddress}`,
    );
  }

  async notice(tourReservation: TourReservation): Promise<boolean> {
    try {
      // TODO: retrieve email
      const userEmail = 'VALID_USER_EMAIL';

      // TODO: use Ejs renderer or etc..
      await this.transporter.sendMail({
        from: this.senderEmailAddress,
        to: userEmail,
        subject: `[투어 예약 확인] 투어가 ${tourReservation.startAt}에 예약되었습니다.`,
        text: `예약번호: ${tourReservation.id}`,
      });

      return Promise.resolve(true);
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      this.logger.error(e.message);

      return Promise.resolve(false);
    }
  }
}
