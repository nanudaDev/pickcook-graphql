import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseModel } from 'src/core';
import { FNB_OWNER } from '../../shared/common-code.type';
import { YN } from '../../common';
import { Field, ObjectType } from '@nestjs/graphql';
import { CommonCode } from '../common-code/common-code.model';

@ObjectType()
@Entity({ name: 'proforma_consult_result_v3' })
export class ProformaConsultResultV3 extends BaseModel<ProformaConsultResultV3> {
  @Field(() => String)
  @Column({
    name: 'fnb_owner_status',
    type: 'varchar',
  })
  fnbOwnerStatus: FNB_OWNER;

  @Field(() => String)
  @Column({
    name: 'ip_address',
    type: 'varchar',
  })
  ipAddress: string;

  @Field(() => String)
  @Column({
    name: 'is_consult_yn',
    type: 'char',
    default: YN.NO,
  })
  isConsultYn: YN;

  @Field()
  @OneToOne((type) => CommonCode)
  @JoinColumn({ name: 'fnb_owner_status', referencedColumnName: 'key' })
  fnbOwnerStatusCode?: CommonCode;
}
