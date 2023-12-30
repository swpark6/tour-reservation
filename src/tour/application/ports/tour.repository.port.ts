import { Tour } from 'src/tour/domain/tour';

export abstract class TourRepositoryPort {
  abstract findOneById(tourId: string): Promise<Tour>;
}
