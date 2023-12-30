import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TourReservationCreatedEvent } from 'src/tour-reservation/domain/evnets/tour-reservation-created.event';
import { ApproveTourReservationCommand } from '../commands/approve-tour-reservation.command';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';
import { ApproveTourReservationService } from '../services/approve-tour-reservation.service';

@EventsHandler(TourReservationCreatedEvent)
export class TourReservationCreatedEventHandler
  implements IEventHandler<TourReservationCreatedEvent>
{
  private readonly logger = new Logger(TourReservationCreatedEventHandler.name);
  private static readonly MAX_AUTO_APPROVAL_COUNT = 5;

  constructor(
    private readonly tourReservationRepository: TourReservationRepositoryPort,
    private readonly approveTourReservationService: ApproveTourReservationService,
  ) {}

  /**
   * 예약 신청 이벤트 처리
   * 예약건수가 5건 이하일 경우 승인합니다.
   *   - 예약건수가 5건 초과일 경우 흐름을 종료합니다.
   *   - 그 외 경우 승인합니다.
   * Note: 특정 신청일에 예약이 무수히 많을 수 있는 경우 최대 자동 승인 개수 이상 승인될 수 있습니다.
   *       이 경우 핸들러와 승인 서비스 사이의 트랜잭션을 고려해야 합니다.
   * @param event
   */
  async handle(event: TourReservationCreatedEvent) {
    const { tourReservation } = event;

    // 1. Check tour reservation count on start date
    const tourReservationCount =
      await this.tourReservationRepository.countByTourIdAndStartAt(
        tourReservation.tourId,
        tourReservation.startAt,
      );

    // 2. return if the count gt MAX_AUTO_APPROVAL_COUNT
    if (
      TourReservationCreatedEventHandler.MAX_AUTO_APPROVAL_COUNT <
      tourReservationCount + 1
    ) {
      this.logger.debug(
        `투어예약(id=${tourReservation.id}을 자동승인 하지 않습니다.|${tourReservation.startAt} 일자의 투어예약개수: ${tourReservationCount}`,
      );
      return;
    }

    // 3. Approve (if the count less than or equals to MAX_AUTO_APPROVAL_COUNT)
    await this.approveTourReservationService.approve(
      new ApproveTourReservationCommand(tourReservation.id),
    );

    this.logger.debug(
      `투어예약(id=${tourReservation.id}이 자동승인 되었습니다.|${tourReservation.startAt} 일자의 기존 투어예약개수: ${tourReservationCount}`,
    );
  }
}
