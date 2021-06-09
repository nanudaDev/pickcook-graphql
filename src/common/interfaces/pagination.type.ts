import { ArgsType, Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Min } from 'class-validator';
import { Default } from '../decorators';
import { GraphQLObjectType } from 'graphql';
import { BaseModel } from '../../core/base.model';

// export interface PaginationModel<T> {
//   items?: T[];
// }

@ObjectType()
export class PaginatedResponse<Model> {
  @Field(() => [BaseModel], { nullable: true })
  items?: Model[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;

  // newItems?: PaginationModel;
}

@InputType()
export class PaginatedRequest {
  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(0)
  @Expose()
  @Default(20)
  @Field(() => Int, { nullable: true })
  take?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @Expose()
  @Min(1)
  @Default(1)
  @Field(() => Int, { nullable: true })
  skip?: number;
}
