import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../../../core/base.dto';
import { Faq } from '../faq.model';

@InputType()
export class AdminFaqUpdateDto
  extends BaseDto<AdminFaqUpdateDto>
  implements Partial<Faq>
{
  @ApiPropertyOptional()
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Expose()
  faq?: string;

  @ApiPropertyOptional()
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Expose()
  answer?: string;

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
