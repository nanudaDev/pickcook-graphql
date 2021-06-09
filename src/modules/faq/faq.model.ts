import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/core';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'faq_answer' })
export class Faq extends BaseModel<Faq> {
  @Field({ nullable: true })
  @Column({
    type: 'text',
    nullable: true,
  })
  faq: string;

  @Field(() => Int)
  @Column({
    name: 'faq_parent_id',
    type: 'int',
    nullable: true,
  })
  faqParentId: number;

  @Field()
  @Column({
    type: 'text',
    nullable: true,
  })
  answer: string;

  @Field(() => Int, { nullable: true })
  @Column({
    type: 'int',
  })
  order?: number;
}
