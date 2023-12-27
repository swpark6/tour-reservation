import { Injectable } from '@nestjs/common';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { CreateTourReservationCommand } from '../commands/create-tour-reservation.command';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';

@Injectable()
export class CreateTourReservationService {
  constructor(
    private readonly tourReservationRepositoryPort: TourReservationRepositoryPort,
  ) {}

  /**
   * 투어 예약
   * @param command
   */
  async create(
    command: CreateTourReservationCommand,
  ): Promise<TourReservation> {
    const { tourId, userId } = command;

    // 1. Create new tour reservation
    const tourReservation = TourReservation.create(tourId, userId);

    // 2. Save
    return this.tourReservationRepositoryPort.save(tourReservation);
  }
}
