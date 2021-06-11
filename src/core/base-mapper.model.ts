import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseDto } from '.';

@ObjectType()
export class BaseMapperModel<Entity> extends BaseEntity {
  constructor(partial?: Partial<Entity>) {
    super();
    partial &&
      Object.keys(partial).map((key) => {
        //   changed primary key column from no to id
        // if (key !== 'id' && this.hasOwnProperty(key)) {
        if (key !== 'id' && partial[key] !== undefined) {
          this[key] = partial[key];
        }
      });
  }

  set(partial: Record<string, any>, deep = false): this {
    partial &&
      Object.keys(partial).map((key) => {
        // if (key !== 'id' && this.hasOwnProperty(key)) {
        if (partial[key] !== undefined) {
          if (deep) {
            this[key] = partial[key];
          } else {
            if (!(partial[key] instanceof BaseDto)) {
              this[key] = partial[key];
            }
          }
        }
        // }
      });
    return this;
  }
  @Field(() => Int)
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
  })
  id: number;

  @Field()
  @CreateDateColumn({
    name: 'created',
    type: 'datetime',
    default: new Date(),
  })
  created?: Date;
}
