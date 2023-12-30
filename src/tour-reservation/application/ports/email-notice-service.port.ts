import { TourReservation } from 'src/tour-reservation/domain/tour-reservation';

export abstract class EmailNoticeServicePort {
  abstract notice(tourReservation: TourReservation): Promise<boolean>;
}
