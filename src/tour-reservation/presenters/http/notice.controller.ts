import { Controller, Param, Post } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { NoticeCommand } from 'src/tour-reservation/application/commands/notice.command';
import { NoticeService } from 'src/tour-reservation/application/services/notice-service';

@Controller('tour-reservations')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ description: '투어예약이 존재하지 않은 경우' })
  @ApiOperation({ operationId: 'notice', summary: '투어 예약 알림 전송' })
  @Post('/:tourReservationId/notice')
  notice(
    @Param('tourReservationId') tourReservationId: string,
  ): Promise<boolean> {
    return this.noticeService.notice(new NoticeCommand(tourReservationId));
  }
}
