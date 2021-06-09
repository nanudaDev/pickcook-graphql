import { Get, Inject, ParseIntPipe } from '@nestjs/common';
import { Args, Resolver, Query, ResolveField } from '@nestjs/graphql';
import { Faq } from './faq.model';
import { FaqService, FaqPagination } from './faq.service';
import {
  PaginatedResponse,
  PaginatedRequest,
} from '../../common/interfaces/pagination.type';
import { AdminFaqListDto } from './dto/admin-faq-list.dto';

@Resolver((of) => Faq)
export class FaqResolver {
  constructor(@Inject(FaqService) private readonly faqService: FaqService) {}

  /**
   * return one faq
   * @param id
   * @returns
   */
  @Query((returns) => Faq)
  async faqFindOne(@Args('id') id: number): Promise<Faq> {
    return await this.faqService.findOne(id);
  }

  /**
   * returns all faq
   * @returns
   */
  @Query((returns) => [Faq])
  async faqFindAll(): Promise<Faq[]> {
    return await this.faqService.findAll();
  }

  /**
   * returns faq with pagination query
   * @param adminFaqListDto
   * @param pagination
   * @returns
   */
  @Query((returns) => FaqPagination)
  async findAllFaqForAdmin(
    @Args({ nullable: true }) adminFaqListDto?: AdminFaqListDto,
    @Args('pagination', { nullable: true }) pagination?: PaginatedRequest,
  ): Promise<FaqPagination> {
    return await this.faqService.findAllForAdmin(adminFaqListDto, pagination);
  }
}
