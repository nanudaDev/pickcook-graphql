import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BaseDto } from '../../../core/base.dto';
import { Faq } from '../faq.model';
import { ORDER_BY_VALUE } from '../../../common/interfaces/order-by-value.type';
import { Default } from '../../../common/decorators/default.decorator';
@ArgsType()
export class AdminFaqListDto
  extends BaseDto<AdminFaqListDto>
  implements Partial<Faq>
{
  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  id?: number;

  @ApiPropertyOptional()
  @Expose()
  @IsOptional()
  @Field(() => Int, { nullable: true })
  order?: number;

  @ApiPropertyOptional({ enum: ORDER_BY_VALUE })
  @Expose()
  @IsOptional()
  @Field({ nullable: true })
  @Default(ORDER_BY_VALUE.DESC)
  orderById?: ORDER_BY_VALUE;
}
