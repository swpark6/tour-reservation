import { Entity, PrimaryColumn } from 'typeorm';

@Entity('tours')
export class TourEntity {
  @PrimaryColumn()
  id: string;
}
