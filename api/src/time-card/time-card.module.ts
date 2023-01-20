import { Module } from '@nestjs/common';
import { TimeCardService } from './time-card.service';

@Module({
  providers: [TimeCardService]
})
export class TimeCardModule {}
