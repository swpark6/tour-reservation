import { Injectable, NotFoundException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { TourHolydaysUpdatedEvent } from 'src/tour/domain/events/tour-holydays-updated.event';
import { Tour } from 'src/tour/domain/tour';
import { HolydayVo } from 'src/tour/domain/value-object/holyday.vo';
import { SetHolydayCommand } from '../commands/set-holyday.command';
import { TourRepositoryPort } from '../ports/tour.repository.port';

@Injectable()
export class SetHolydaysService {
  constructor(
    private readonly tourRepository: TourRepositoryPort,
    private readonly eventBus: EventBus,
  ) {}

  /**
   * 휴일 지정
   * @param command
   * @returns
   */
  async setHolyday(command: SetHolydayCommand): Promise<Tour> {
    const { tourId, holydays } = command;

    const tour = await this.tourRepository.findOneById(tourId);
    if (!tour) {
      throw new NotFoundException(`tour(id=${tourId})`);
    }

    const tourHolydays = holydays.map((holyday) => new HolydayVo(holyday));
    tour.setHolydays(tourHolydays);

    const newTour = await this.tourRepository.save(tour);

    this.eventBus.publish(new TourHolydaysUpdatedEvent(newTour));

    return newTour;
  }
}
