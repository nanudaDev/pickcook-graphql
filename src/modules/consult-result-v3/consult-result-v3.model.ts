import { BaseModel } from 'src/core';
import { BRAND_CONSULT, FNB_OWNER } from 'src/shared';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { PlatformAdmin } from '../auth/plaform-admin.model';
import { CommonCode } from '../common-code/common-code.model';
import { ProformaConsultResultV3 } from '../proforma-consult-result-v3/proforma-consult-result-v3.model';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'consult_result_v3' })
export class ConsultResultV3 extends BaseModel<ConsultResultV3> {
  @Field(() => Int)
  @Column({
    name: 'proforma_consult_result_id',
    type: 'int',
  })
  proformaConsultResultId: number;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  phone: string;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'text',
  })
  description: string;

  @Field(() => String, { nullable: false })
  @Column({
    name: 'consult_status',
    nullable: false,
    default: () => BRAND_CONSULT.NEW_CONSULT,
  })
  consultStatus: BRAND_CONSULT;

  @Field()
  @Column({
    name: 'consult_complete_date',
    type: 'datetime',
  })
  consultCompleteDate: Date;

  @Field()
  @Column({
    name: 'consult_drop_date',
    type: 'datetime',
  })
  consultDropDate: Date;

  @Field(() => String, { nullable: false })
  @Column({
    name: 'fnb_owner_status',
    type: 'varchar',
  })
  fnbOwnerStatus: FNB_OWNER;

  @Field(() => Int, { nullable: false })
  @Column({
    name: 'admin_id',
    type: 'int',
  })
  adminId?: number;

  @Field()
  @OneToOne((type) => CommonCode)
  @JoinColumn({ name: 'fnb_owner_status', referencedColumnName: 'key' })
  fnbOwnerCodeStatus?: CommonCode;

  @Field()
  @OneToOne((type) => ProformaConsultResultV3)
  @JoinColumn({ name: 'proforma_consult_result_id' })
  proformaConsultResult?: ProformaConsultResultV3;

  @Field()
  @OneToOne((type) => CommonCode)
  @JoinColumn({ name: 'consult_status', referencedColumnName: 'key' })
  consultCodeStatus?: CommonCode;

  @Field()
  admin?: PlatformAdmin;
}
