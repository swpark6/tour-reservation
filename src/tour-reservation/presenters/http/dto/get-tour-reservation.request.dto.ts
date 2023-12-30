import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetTourReservationRequestDto {
  @ApiProperty({ example: '0b4156f3-3f2a-4c19-a39e-66bcdf5477d0' })
  @IsUUID()
  tourReservationId: string;
}
