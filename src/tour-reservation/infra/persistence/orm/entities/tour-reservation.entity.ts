import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

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

  @Column()
  cancellationDueDate: Date;

  @Column()
  canceledAt: Date | null;

  @Column()
  approvedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;
}
