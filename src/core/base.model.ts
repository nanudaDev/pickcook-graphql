import { Field, ObjectType, Int } from '@nestjs/graphql';
import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseDto } from './base.dto';

@ObjectType()
export class BaseModel<Model> extends TypeOrmBaseEntity {
  constructor(partial?: Partial<Model>) {
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

  set(partial: Record<string, any>, deep: boolean = false): this {
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

  setNew(partial: any, deep: boolean = false): this {
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
    delete this.id;
    return this;
  }

  @Field(() => Int, { nullable: false })
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

  @Field()
  @UpdateDateColumn({
    name: 'updated',
    type: 'datetime',
  })
  updated?: Date;
}
