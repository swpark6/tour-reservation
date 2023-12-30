import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TourReservationModule } from './tour-reservation/tour-reservation.module';
import { TourModule } from './tour/tour.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      password: 'root',
      username: 'root',
      database: 'local',
      autoLoadEntities: true,
      synchronize: false,
      timezone: 'Z',
    }),
    CqrsModule.forRoot(),
    RedisModule.forRoot({
      config: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TourReservationModule,
    TourModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
