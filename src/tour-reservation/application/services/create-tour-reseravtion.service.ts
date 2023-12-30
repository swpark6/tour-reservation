import { Injectable } from '@nestjs/common';
import { TourReservationFactory } from 'src/tour-reservation/domain/factories/tour-reservation.factory';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { CreateTourReservationCommand } from '../commands/create-tour-reservation.command';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';

@Injectable()
export class CreateTourReservationService {
  constructor(
    private readonly tourReservationFactory: TourReservationFactory,
    private readonly tourReservationRepositoryPort: TourReservationRepositoryPort,
  ) {}

  /**
   * 투어 예약
   * @param command
   */
  async create(
    command: CreateTourReservationCommand,
  ): Promise<TourReservation> {
    const { tourId, userId, startAt } = command;

    // 1. Create new tour reservation
    const tourReservation = this.tourReservationFactory.create(
      tourId,
      userId,
      startAt,
    );

    // 2. Save
    return this.tourReservationRepositoryPort.save(tourReservation);
  }
}
