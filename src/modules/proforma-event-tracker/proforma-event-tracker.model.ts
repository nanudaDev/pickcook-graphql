import { BaseMapperModel } from 'src/core';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { FNB_OWNER } from '../../shared/common-code.type';
import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'proforma_event_tracker' })
export class ProformaEventTracker extends BaseMapperModel<ProformaEventTracker> {
  @Field(() => String)
  @Column({
    name: 'ip_address',
    type: 'varchar',
  })
  ipAddress: string;

  @Field(() => Int)
  @Column({
    name: 'proforma_consult_id',
    type: 'int',
  })
  proformaConsultId: number;

  @Field(() => Int, { nullable: true })
  @Column({
    name: 'version_number',
    nullable: true,
  })
  versionNumber?: number;

  @Field(() => String)
  @Column({
    name: 'fnb_owner_status',
    type: 'varchar',
  })
  fnbOwnerStatus?: FNB_OWNER;
}
