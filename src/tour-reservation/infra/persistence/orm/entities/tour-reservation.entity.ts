import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('tour_reservations')
export class TourReservationEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column()
  tourId: string;

  @Column()
  userId: string;

  @Column()
  startAt: Date;
}
