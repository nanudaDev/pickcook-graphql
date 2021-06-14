import { Field, InputType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { BaseDto } from '../../../core/base.dto';
import { ConsultResultV3 } from '../consult-result-v3.model';
import { BRAND_CONSULT, FNB_OWNER } from '../../../shared/common-code.type';
import { Expose } from 'class-transformer';
import { ORDER_BY_VALUE } from '../../../common/interfaces/order-by-value.type';
import { Default } from '../../../common/decorators/default.decorator';

@InputType()
export class AdminConsultResultV3ListDto
  extends BaseDto<AdminConsultResultV3ListDto>
  implements Partial<ConsultResultV3>
{
  @ApiPropertyOptional({ enum: BRAND_CONSULT })
  @IsOptional()
  @Field(() => String, { nullable: true })
  @Expose()
  @IsEnum(BRAND_CONSULT)
  consultStatus?: BRAND_CONSULT;

  @ApiPropertyOptional({ enum: BRAND_CONSULT })
  @IsOptional()
  @Field(() => String, { nullable: true })
  @Expose()
  name?: string;

  @ApiPropertyOptional({ enum: BRAND_CONSULT })
  @IsOptional()
  @Field(() => String, { nullable: true })
  @Expose()
  //   @IsPhoneNumber('KR')
  phone?: string;

  @ApiPropertyOptional({ enum: FNB_OWNER })
  @IsOptional()
  @IsEnum(FNB_OWNER)
  @Field(() => String, { nullable: true })
  @Expose()
  fnbOwnerStatus?: FNB_OWNER;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @Expose()
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsEnum(ORDER_BY_VALUE)
  @Default(ORDER_BY_VALUE.DESC)
  orderById?: ORDER_BY_VALUE;
}
