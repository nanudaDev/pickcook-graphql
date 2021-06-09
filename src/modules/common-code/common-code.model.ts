import { YN } from 'src/common';
import { BaseModel } from 'src/core';
// import { COMMON_CODE_CATEGORY } from 'src/shared';
import { Column, Entity } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { COMMON_CODE_CATEGORY } from 'src/shared';

@ObjectType()
@Entity({ name: 'common_code' })
export class CommonCode extends BaseModel<CommonCode> {
  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  key: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  value: string;

  @Field(() => String, { nullable: false })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  category: COMMON_CODE_CATEGORY;

  @Field(() => String, { nullable: true })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  comment: string;

  @Field(() => String, { nullable: true })
  @Column({
    name: 'display_value',
    type: 'varchar',
  })
  displayName: string;

  @Field(() => String, { nullable: true })
  @Column({
    name: 'additional_display_value',
    type: 'varchar',
  })
  additionalDisplayValue: string;

  @Field(() => String, { nullable: true, defaultValue: YN.NO })
  @Column({
    name: 'score_code_yn',
    type: 'char',
    length: 1,
    default: () => YN.NO,
  })
  scoreCodeYn: YN;
}
