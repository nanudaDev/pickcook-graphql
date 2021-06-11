import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultResultV3 } from './consult-result-v3.model';
import { ConsultResultV3Resolver } from './consult-result-v3.resolver';
import { ConsultResultV3Service } from './consult-result-v3.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultResultV3])],
  providers: [ConsultResultV3Resolver, ConsultResultV3Service],
  exports: [ConsultResultV3Service],
})
export class ConsultResultV3Module {}
