import { Injectable, NotFoundException } from '@nestjs/common';
import { NoticeCommand } from '../commands/notice.command';
import { EmailNoticeServicePort } from '../ports/email-notice-service.port';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';

@Injectable()
export class NoticeService {
  constructor(
    private readonly emailNoticeService: EmailNoticeServicePort,
    private readonly tourReservationRepository: TourReservationRepositoryPort,
  ) {}

  /**
   * 알림 전송
   * @param command
   * @returns
   */
  async notice(command: NoticeCommand): Promise<boolean> {
    const { tourReservationId } = command;

    const tourReservation =
      await this.tourReservationRepository.findOneById(tourReservationId);

    if (!tourReservation) {
      throw new NotFoundException(`tourReservation(id=${tourReservationId})`);
    }

    return this.emailNoticeService.notice(tourReservation);
  }
}
