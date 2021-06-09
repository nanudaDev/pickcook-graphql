import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './faq.model';
import { FaqResolver } from './faq.resolver';
import { FaqService } from './faq.service';
import { AdminFaqResolver } from './admin-faq.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  providers: [FaqResolver, FaqService, AdminFaqResolver],
  exports: [FaqService],
})
export class FaqModule {}
