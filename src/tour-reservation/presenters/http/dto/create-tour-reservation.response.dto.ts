import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTourReservationResponseDto {
  @Expose()
  id: string;
}
