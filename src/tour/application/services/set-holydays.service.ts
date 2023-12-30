import { Injectable, NotFoundException } from '@nestjs/common';
import { Tour } from 'src/tour/domain/tour';
import { HolydayVo } from 'src/tour/domain/valud-object/holyday.vo';
import { SetHolydayCommand } from '../commands/set-holyday.command';
import { TourRepositoryPort } from '../ports/tour.repository.port';

@Injectable()
export class SetHolydaysService {
  constructor(private readonly tourRepository: TourRepositoryPort) {}

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

    return this.tourRepository.save(tour);
  }
}
