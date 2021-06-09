import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '../../../core/base.dto';
import { CommonCode } from '../common-code.model';
import { IsEnum, IsOptional } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';
import { YN } from '../../../common/interfaces/del-yn.type';
import { ORDER_BY_VALUE } from '../../../common/interfaces/order-by-value.type';
import { Default } from '../../../common/decorators/default.decorator';
import { COMMON_CODE_CATEGORY } from '../../../shared/common-code-category.type';

@ArgsType()
export class AdminCommonCodeListDto
  extends BaseDto<CommonCode>
  implements Partial<CommonCode>
{
  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @Field(() => String, { nullable: true })
  key?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Expose()
  @Field(() => String, { nullable: true })
  value?: string;

  @ApiPropertyOptional({ enum: COMMON_CODE_CATEGORY })
  @IsOptional()
  @IsEnum(COMMON_CODE_CATEGORY)
  @Expose()
  @Field(() => String, { nullable: true })
  category?: COMMON_CODE_CATEGORY;

  @ApiPropertyOptional({ enum: YN })
  @Expose()
  @IsOptional()
  @Field(() => String, { nullable: true })
  @IsEnum(YN)
  scoreCodeYn?: YN;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @Expose()
  @IsEnum(ORDER_BY_VALUE)
  @Field(() => String, {
    nullable: true,
    defaultValue: ORDER_BY_VALUE.DESC,
  })
  @Default(ORDER_BY_VALUE.DESC)
  orderById?: ORDER_BY_VALUE;
}
