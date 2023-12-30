import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CancelTourReservationRequestDto {
  @ApiProperty({ example: '7affae0f-7867-44ca-94b3-5db3a804b37e' })
  @IsNotEmpty()
  @IsUUID()
  tourReservationId: string;
}
