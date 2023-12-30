import { ApiProperty } from '@nestjs/swagger';
import { IsString, Max, Min } from 'class-validator';

export class SetHolydaysRequestDto {
  @ApiProperty({ example: ['2024-01-04'], isArray: true })
  // TODO: Validate YYYY-MM-DD
  @IsString({ each: true })
  holydays: string[];

  @ApiProperty({ example: [0, 6], isArray: true })
  @Min(0, { each: true })
  @Max(7, { each: true })
  holydaysOfWeek: number[];
}
