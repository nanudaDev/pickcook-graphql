import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCode } from './common-code.model';
import { Repository } from 'typeorm';
import { AdminCommonCodeListDto } from './dto/admin-common-code-list.dto';
import {
  PaginatedRequest,
  PaginatedResponse,
} from '../../common/interfaces/pagination.type';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonCodeListDto } from './dto';

@ObjectType()
export class CommonCodePagination extends PaginatedResponse<CommonCode> {
  @Field(() => [CommonCode], { nullable: true })
  items?: CommonCode[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@Injectable()
export class CommonCodeService {
  constructor(
    @InjectRepository(CommonCode)
    private readonly commonCodeRepo: Repository<CommonCode>,
  ) {}

  /**
   * find all with pagination
   * @param adminCommonCodeListDto
   * @param pagination
   * @returns
   */
  async findAllForAdmin(
    adminCommonCodeListDto: AdminCommonCodeListDto,
    pagination: PaginatedRequest,
  ): Promise<CommonCodePagination> {
    const qb = this.commonCodeRepo
      .createQueryBuilder('commonCode')
      .AndWhereLike(
        'commonCode',
        'scoreCodeYn',
        adminCommonCodeListDto.scoreCodeYn,
        adminCommonCodeListDto.exclude('scoreCodeYn'),
      )
      .Paginate(pagination)
      .WhereAndOrder(adminCommonCodeListDto);

    const [items, totalCount] = await qb.getManyAndCount();

    return { items, totalCount };
  }

  /**
   * find one for admin
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<CommonCode> {
    const commonCode = await this.commonCodeRepo.findOne(id);
    if (!commonCode) throw new NotFoundException();
    return commonCode;
  }

  /**
   * find all for users
   * @param commonCodeListDto
   * @returns
   */
  async findAll(commonCodeListDto: CommonCodeListDto): Promise<CommonCode[]> {
    const qb = this.commonCodeRepo
      .createQueryBuilder('commonCode')
      .AndWhereLike(
        'commonCode',
        'key',
        commonCodeListDto.key,
        commonCodeListDto.exclude('key'),
      )
      .AndWhereLike(
        'commonCode',
        'category',
        commonCodeListDto.category,
        commonCodeListDto.exclude('category'),
      )
      .AndWhereLike(
        'commonCode',
        'value',
        commonCodeListDto.value,
        commonCodeListDto.exclude('value'),
      )
      .AndWhereLike(
        'commonCode',
        'scoreCodeYn',
        commonCodeListDto.scoreCodeYn,
        commonCodeListDto.exclude('scoreCodeYn'),
      )
      .WhereAndOrder(commonCodeListDto);

    return await qb.getMany();
  }
}
