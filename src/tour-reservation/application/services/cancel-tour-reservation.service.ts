import { Injectable, NotFoundException } from '@nestjs/common';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { CancelTourReservationCommand } from '../commands/cancel-tour-reservation.command';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';

@Injectable()
export class CancelTourReservationService {
  constructor(
    private readonly tourReservationRepository: TourReservationRepositoryPort,
  ) {}

  /**
   * 투어 예약 취소
   * @param command
   * @returns
   */
  async cancel(
    command: CancelTourReservationCommand,
  ): Promise<TourReservation> {
    const { tourReservationId, now } = command;

    const tourReservation =
      await this.tourReservationRepository.findOneById(tourReservationId);

    if (!tourReservation) {
      throw new NotFoundException(`TourReservation(id=${tourReservationId})`);
    }

    tourReservation.cancel(now);

    return this.tourReservationRepository.save(tourReservation);
  }
}
