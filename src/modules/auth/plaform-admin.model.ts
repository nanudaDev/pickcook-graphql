import { BasePlatformModel } from 'src/core';
import { ADMIN_USER } from 'src/shared';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'ADMIN_USER' })
export class PlatformAdmin extends BasePlatformModel<PlatformAdmin> {
  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
    unique: true,
    name: 'PHONE',
  })
  phone: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
    length: 20,
    name: 'NAME',
    nullable: false,
  })
  name: string;

  @Field(() => String)
  @Column({
    type: 'varchar',
    nullable: false,
    default: ADMIN_USER.NORMAL,
    name: 'AUTH_CODE',
    length: 10,
  })
  authCode: ADMIN_USER;

  @Field()
  @Column({
    type: 'datetime',
    name: 'LAST_LOGIN_AT',
  })
  lastLoginAt?: Date;
}
