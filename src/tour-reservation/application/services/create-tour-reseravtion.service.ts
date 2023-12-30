import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { TourReservationCreatedEvent } from 'src/tour-reservation/domain/evnets/tour-reservation-created.event';
import { TourReservationFactory } from 'src/tour-reservation/domain/factories/tour-reservation.factory';
import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';
import { CreateTourReservationCommand } from '../commands/create-tour-reservation.command';
import { TourReservationRepositoryPort } from '../ports/tour-reservation.repository.port';

@Injectable()
export class CreateTourReservationService {
  constructor(
    private readonly tourReservationFactory: TourReservationFactory,
    private readonly tourReservationRepositoryPort: TourReservationRepositoryPort,
    private readonly eventBus: EventBus,
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
    const newTourReservation =
      await this.tourReservationRepositoryPort.save(tourReservation);

    // 3. Publish event
    this.eventBus.publish(new TourReservationCreatedEvent(newTourReservation));

    return newTourReservation;
  }
}
