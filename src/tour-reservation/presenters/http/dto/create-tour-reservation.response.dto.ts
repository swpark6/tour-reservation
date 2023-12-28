import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTourReservationResponseDto {
  @ApiProperty({ example: '7affae0f-7867-44ca-94b3-5db3a804b37e' })
  @Expose()
  id: string;
}
