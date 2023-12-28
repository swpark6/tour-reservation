import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

export abstract class TourScheduleValidatorPort {
  abstract validate(tourReservation: TourReservation): Promise<boolean>;
}
