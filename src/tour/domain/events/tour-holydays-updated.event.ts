import { Tour } from '../tour';

export class TourHolydaysUpdatedEvent {
  constructor(public readonly tour: Tour) {}
}
