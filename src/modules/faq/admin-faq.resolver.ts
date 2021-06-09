import { Inject, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PaginatedRequest } from 'src/common';
import { AdminFaqListDto } from './dto';
import { Faq } from './faq.model';
import { FaqService, FaqPagination } from './faq.service';
import { PlatformGqlAuthGuard } from '../../core/guard/auth-roles.guard';
import { CONST_ADMIN_ROLES } from 'src/shared';
import { CONST_ADMIN_USER } from '../../shared/platform-common-code.type';
import { AdminFaqCreateDto } from './dto/admin-faq-create.dto';
import { AdminFaqUpdateDto } from './dto/admin-faq-update.dto';

@Resolver((of) => Faq)
@UseGuards(new PlatformGqlAuthGuard(...CONST_ADMIN_USER))
export class AdminFaqResolver {
  constructor(@Inject(FaqService) private readonly faqService: FaqService) {}
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

  /**
   * find one for admin
   * @param id
   * @returns
   */
  @Query((returns) => Faq)
  async findOneFaqForAdmin(@Args('id', ParseIntPipe) id: number): Promise<Faq> {
    return await this.faqService.findOne(id);
  }

  /**
   * create for admin
   * @param adminFaqCreateDto
   * @returns
   */
  @Mutation((returns) => Faq)
  async createFaqForAdmin(
    @Args({ name: 'adminFaqCreateDto' }) adminFaqCreateDto: AdminFaqCreateDto,
  ): Promise<Faq> {
    return await this.faqService.createForAdmin(adminFaqCreateDto);
  }

  /**
   * update for admin
   * @param id
   * @param adminFaqUpdateDto
   * @returns
   */
  @Mutation((returns) => Faq)
  async updateFaqForAdmin(
    @Args('id', ParseIntPipe) id: number,
    @Args('adminFaqUpdateDto') adminFaqUpdateDto: AdminFaqUpdateDto,
  ): Promise<Faq> {
    return await this.faqService.updateForAdmin(id, adminFaqUpdateDto);
  }
}
