import { Injectable, NotFoundException } from '@nestjs/common';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';
import { GetTourReservationQuery } from '../queries/get-tour-reservation.query';

@Injectable()
export class GetTourReservationService {
  constructor(
    private readonly tourReservationRepository: TourReservationRepositoryPort,
  ) {}

  /**
   * 고객 예약 여부 확인
   * @param query
   * @returns
   */
  async findOne(query: GetTourReservationQuery): Promise<TourReservation> {
    const { tourReservationId } = query;

    const tourReservation =
      await this.tourReservationRepository.findOneById(tourReservationId);

    if (!tourReservation) {
      throw new NotFoundException();
    }

    return tourReservation;
  }
}
