import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { BaseDto } from '../../../core/base.dto';
import { ConsultResultV3 } from '../consult-result-v3.model';

@InputType()
export class ConsultResultV3CreateDto
  extends BaseDto<ConsultResultV3CreateDto>
  implements Partial<ConsultResultV3>
{
  @ApiProperty()
  @Expose()
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsPhoneNumber('KR', { message: '올바른 전화번호를 입력해주세요' })
  @IsNotEmpty()
  @Expose()
  @Field(() => String, { nullable: false })
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @Expose()
  @Field(() => Int, { nullable: false })
  proformaConsultResultId: number;
}
