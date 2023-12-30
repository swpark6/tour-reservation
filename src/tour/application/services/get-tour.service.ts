import { Injectable, NotFoundException } from '@nestjs/common';
import { TourRepositoryPort } from '../ports/tour.repository.port';
import { GetTourQuery } from '../queries/get-tour.query';

@Injectable()
export class GetTourService {
  constructor(private readonly tourRepository: TourRepositoryPort) {}

  /**
   * 투어 조회 (휴일조회)
   * @param query
   * @returns
   */
  async findOne(query: GetTourQuery) {
    const { tourId } = query;

    const tour = await this.tourRepository.findOneById(tourId);
    if (!tour) {
      throw new NotFoundException(`tour(id=${tourId})`);
    }

    return tour;
  }
}
