import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseDto } from '../../../core/base.dto';
import { ConsultResultV3 } from '../consult-result-v3.model';
import { FNB_OWNER, BRAND_CONSULT } from '../../../shared/common-code.type';
import { IsEnum, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AdminConsultResultV3UpdateDto
  extends BaseDto<AdminConsultResultV3UpdateDto>
  implements Partial<ConsultResultV3>
{
  @ApiPropertyOptional()
  @Expose()
  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: BRAND_CONSULT })
  @IsOptional()
  @Expose()
  @Field(() => String, { nullable: true })
  @IsEnum(BRAND_CONSULT)
  consultStatus?: BRAND_CONSULT;
}
