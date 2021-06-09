import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../../../core/base.dto';
import { Faq } from '../faq.model';

@InputType()
export class AdminFaqCreateDto
  extends BaseDto<AdminFaqCreateDto>
  implements Partial<Faq>
{
  @ApiProperty()
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @Expose()
  faq: string;

  @ApiProperty()
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @Expose()
  answer: string;

  @ApiPropertyOptional()
  @Field(() => Int, { nullable: true })
  @Expose()
  @IsOptional()
  order?: number;

  @ApiPropertyOptional()
  @Field(() => Int, { nullable: true })
  @Expose()
  @IsOptional()
  faqParentId?: number;
}
