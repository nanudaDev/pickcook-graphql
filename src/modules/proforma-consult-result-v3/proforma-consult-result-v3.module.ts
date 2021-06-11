import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProformaConsultResultV3 } from './proforma-consult-result-v3.model';
import { ProformaConsultResultV3Service } from './proforma-consult-result-v3.service';
import { ProformaResolver } from './proforma-consult-result-v3.resolver';
import { ProformaEventTrackerModule } from '../proforma-event-tracker/proforma-event-tracker.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProformaConsultResultV3]),
    ProformaEventTrackerModule,
  ],
  providers: [ProformaConsultResultV3Service, ProformaResolver],
  exports: [ProformaConsultResultV3Service],
})
export class ProformaConsultResultV3Module {}
