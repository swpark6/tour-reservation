import { ApiProperty } from '@nestjs/swagger';
import { IsCronExpression } from 'src/common/decorators/is-cron-expression.decorator';

export class SetHolydaysRequestDto {
  @ApiProperty({ example: ['0 0 * * 1'], isArray: true })
  @IsCronExpression({ each: true })
  holydays: string[];
}
