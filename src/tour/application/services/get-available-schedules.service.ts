import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import Redis from 'ioredis';
import { TourRepositoryPort } from '../ports/tour.repository.port';
import { GetAvailableSchedulesQuery } from '../queries/get-available-schedules.query';

@Injectable()
export class GetAvailableSchedulesService {
  private readonly logger = new Logger(GetAvailableSchedulesService.name);

  constructor(
    private readonly tourRepository: TourRepositoryPort,
    @InjectRedis() private readonly redis: Redis,
  ) {}
  /**
   * @param year
   * @param month
   * @returns
   */
  async getAvailableSchedules(
    query: GetAvailableSchedulesQuery,
  ): Promise<number[]> {
    const { tourId, year, month } = query;

    // 1. Get available schedules from cache (tourId:year:month)
    const scheduleCacheId = this.getScheduleCacheId(tourId, year, month);
    const serializedAvailableSchedules = await this.redis.get(scheduleCacheId);

    // 2. If exists, return the available schedules
    if (serializedAvailableSchedules) {
      this.logger.debug(
        `HIT Cache ${scheduleCacheId} ${serializedAvailableSchedules}`,
      );
      const availableSchedules = serializedAvailableSchedules
        .split(',')
        .map(Number);

      return availableSchedules;
    }

    // 3. If not exists, calculate available schedules and set cache
    // 3-1. Get tour from db
    const tour = await this.tourRepository.findOneById(tourId);

    if (!tour) {
      throw new NotFoundException(`Tour(id=${tourId})`);
    }

    // 3-2. Get available schedules
    const newAvailableSchedules = tour.availableSchedules(year, month);

    // 3-2. Set to cache
    const serializedNewAvailableSchedules = newAvailableSchedules.toString();
    await this.redis.set(scheduleCacheId, serializedNewAvailableSchedules);

    return newAvailableSchedules;
  }

  private getScheduleCacheId(tourId: string, year: number, month: number) {
    return `${tourId}:${year}:${month}`;
  }
}
