import { Injectable } from '@nestjs/common';
import { TourReservationRepositoryPort } from 'src/tour-reservation/application/ports/tour-reservation.repository.port';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

@Injectable()
export class OrmTourReservationRepository
  implements TourReservationRepositoryPort
{
  save(tourReservation: TourReservation): Promise<TourReservation> {
    // TODO Implement
    throw new Error('Method not implemented.');
  }
}
