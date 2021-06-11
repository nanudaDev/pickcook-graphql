import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsIP, IsNotEmpty } from 'class-validator';
import { BaseDto } from '../../../core/base.dto';
import { ProformaConsultResultV3 } from '../proforma-consult-result-v3.model';
import { FNB_OWNER } from '../../../shared/common-code.type';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ProformaConsultResultV3CreateDto
  extends BaseDto<ProformaConsultResultV3CreateDto>
  implements Partial<ProformaConsultResultV3>
{
  @ApiProperty()
  @IsNotEmpty()
  @IsIP()
  @Expose()
  @Field(() => String)
  ipAddress: string;

  @ApiProperty({ enum: FNB_OWNER })
  @IsNotEmpty()
  @IsEnum(FNB_OWNER)
  @Expose()
  @Field(() => String)
  fnbOwnerStatus: FNB_OWNER;
}
