import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { TourHolydaysUpdatedEvent } from 'src/tour/domain/events/tour-holydays-updated.event';

@EventsHandler(TourHolydaysUpdatedEvent)
export class TourHolydaysUpdatedEventHandler
  implements IEventHandler<TourHolydaysUpdatedEvent>
{
  private readonly logger = new Logger(TourHolydaysUpdatedEventHandler.name);

  constructor(@InjectRedis() private readonly redis: Redis) {}

  /**
   * 투어 휴일 업데이트 이벤트 처리
   * - 예약 가능 일정 캐시를 무효화합니다.
   * @param event
   */
  async handle(event: TourHolydaysUpdatedEvent) {
    const { tour } = event;

    const targetKeys = await this.redis.keys(`${tour.id}:*`);

    if (targetKeys.length === 0) {
      return;
    }

    await this.redis.del(targetKeys);
    this.logger.debug(
      `투어가 업데이트되어 캐시가 무효화 되었습니다. targetKeys=${targetKeys}`,
    );
  }
}
