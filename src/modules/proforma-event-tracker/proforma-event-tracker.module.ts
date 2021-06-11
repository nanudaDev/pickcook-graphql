import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformaEventTracker } from './proforma-event-tracker.model';
import { ProformaEventTrackerService } from './proforma-event-tracker.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProformaEventTracker])],
  providers: [ProformaEventTrackerService],
  exports: [ProformaEventTrackerService],
})
export class ProformaEventTrackerModule {}
