import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonCode } from './common-code.model';
import { CommonCodeService } from './common-code.service';
import { AdminCommonCodeResolver } from './admin-common-code.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CommonCode])],
  providers: [CommonCodeService, AdminCommonCodeResolver],
  exports: [CommonCodeService],
})
export class CommonCodeModule {}
