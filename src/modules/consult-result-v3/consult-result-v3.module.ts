import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultResultV3 } from './consult-result-v3.model';
import { ConsultResultV3Resolver } from './consult-result-v3.resolver';
import { ConsultResultV3Service } from './consult-result-v3.service';
import { AdminConsultResultV3Resolver } from './admin-consult-result-v3.resolver';
import { PlatformAdmin } from '../auth/plaform-admin.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultResultV3]),
    TypeOrmModule.forFeature([PlatformAdmin], 'platform'),
  ],
  providers: [
    ConsultResultV3Resolver,
    ConsultResultV3Service,
    AdminConsultResultV3Resolver,
  ],
  exports: [ConsultResultV3Service],
})
export class ConsultResultV3Module {}
