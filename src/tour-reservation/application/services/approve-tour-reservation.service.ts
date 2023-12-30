import { Injectable, NotFoundException } from '@nestjs/common';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';

@Injectable()
export class ApproveTourReservationService {
  constructor(
    private readonly tourReservationRepository: TourReservationRepositoryPort,
  ) {}

  /**
   * 투어 예약 승인
   * @param tourReservationId
   * @returns
   */
  async approve(tourReservationId: string): Promise<TourReservation> {
    const tourReservation =
      await this.tourReservationRepository.findOneById(tourReservationId);

    if (!tourReservation) {
      throw new NotFoundException(`TourReservation(id=${tourReservationId}`);
    }

    tourReservation.approve(new Date());

    return this.tourReservationRepository.save(tourReservation);
  }
}
