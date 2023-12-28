import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTourReservationRequestDto {
  @ApiProperty({ example: '275f2933-72da-46b9-91a5-36ac27cef26d' })
  @IsString()
  @IsNotEmpty()
  tourId: string;

  @ApiProperty({ example: '1fe20d10-1d35-41f5-a5d6-cb1cb34cf58c' })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
