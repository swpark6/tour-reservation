import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class GetAvailableSchedulesRequestDto {
  @ApiProperty({ example: 2024 })
  @IsInt()
  year: number;

  @ApiProperty({ example: 1 })
  @Min(1)
  @Max(12)
  month: number;
}
