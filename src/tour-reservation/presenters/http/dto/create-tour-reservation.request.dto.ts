import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class CreateTourReservationRequestDto {
  @ApiProperty({ example: '275f2933-72da-46b9-91a5-36ac27cef26d' })
  @IsString()
  @IsNotEmpty()
  tourId: string;

  @ApiProperty({ example: '1fe20d10-1d35-41f5-a5d6-cb1cb34cf58c' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: '2023-12-28T12:34:56.789Z' })
  @IsISO8601()
  startAt: Date;
}
