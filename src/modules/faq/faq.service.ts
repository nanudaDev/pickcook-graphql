import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './faq.model';
import { AdminFaqListDto } from './dto/admin-faq-list.dto';
import {
  PaginatedResponse,
  PaginatedRequest,
} from '../../common/interfaces/pagination.type';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/core';
import { AdminFaqCreateDto } from './dto/admin-faq-create.dto';
import { AdminFaqUpdateDto } from './dto/admin-faq-update.dto';

@ObjectType()
export class FaqPagination extends PaginatedResponse<Faq> {
  @Field(() => [Faq], { nullable: true })
  items?: Faq[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private readonly faqRepo: Repository<Faq>,
  ) {}

  /**
   * find one fopr admin
   * @param id
   * @returns
   */
  async findOne(id: number): Promise<Faq> {
    return await this.faqRepo.findOne(id);
  }

  async findAll(): Promise<Faq[]> {
    return await this.faqRepo.find();
  }

  /**
   * returns all with pagination
   * @param adminFaqListDto
   * @param pagination
   * @returns
   */
  async findAllForAdmin(
    adminFaqListDto: AdminFaqListDto,
    pagination: PaginatedRequest,
  ): Promise<FaqPagination> {
    const qb = await this.faqRepo
      .createQueryBuilder('faq')
      .AndWhereEqual(
        'faq',
        'id',
        adminFaqListDto.id,
        adminFaqListDto.exclude('id'),
      )
      .AndWhereEqual(
        'faq',
        'order',
        adminFaqListDto.order,
        adminFaqListDto.exclude('order'),
      )
      .Paginate(pagination)
      .WhereAndOrder(adminFaqListDto)
      .getManyAndCount();

    const [items, totalCount] = qb;

    return { items, totalCount };
  }

  /**
   * create new faq
   * @param adminFaqCreateDto
   * @returns
   */
  async createForAdmin(adminFaqCreateDto: AdminFaqCreateDto): Promise<Faq> {
    const newFaq = new Faq(adminFaqCreateDto);
    return await this.faqRepo.save(newFaq);
  }

  /**
   * update for admin
   * @param id
   * @param adminFaqUpdateDto
   * @returns
   */
  async updateForAdmin(
    id: number,
    adminFaqUpdateDto: AdminFaqUpdateDto,
  ): Promise<Faq> {
    let faq = await this.faqRepo.findOne(id);
    if (!faq) throw new NotFoundException();
    faq = faq.set(adminFaqUpdateDto);
    faq = await this.faqRepo.save(faq);
    return faq;
  }
}
