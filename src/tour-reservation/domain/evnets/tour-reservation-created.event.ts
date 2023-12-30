import { TourReservation } from '../tour-reservation';

export class TourReservationCreatedEvent {
  constructor(public readonly tourReservation: TourReservation) {}
}
