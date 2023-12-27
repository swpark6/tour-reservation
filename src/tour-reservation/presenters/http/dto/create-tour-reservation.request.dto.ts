import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTourReservationRequestDto {
  @IsString()
  @IsNotEmpty()
  tourId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
