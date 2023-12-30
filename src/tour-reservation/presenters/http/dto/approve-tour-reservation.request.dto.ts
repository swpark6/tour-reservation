import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ApproveTourReservationRequestDto {
  @ApiProperty({ example: 'ab03b2d8-3673-4b1d-a847-50eba146d4fb' })
  @IsUUID()
  @IsNotEmpty()
  tourReservationId: string;
}
