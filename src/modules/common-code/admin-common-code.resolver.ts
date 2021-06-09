import { Args, Resolver, Query } from '@nestjs/graphql';
import { CommonCode } from './common-code.model';
import { Inject, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CommonCodeService, CommonCodePagination } from './common-code.service';
import { PaginatedRequest } from '../../common/interfaces/pagination.type';
import { AdminCommonCodeListDto } from './dto';
// import { PlatformAuthRolesGuard } from '../../core/guard/auth-roles.guard';
import { CONST_ADMIN_ROLES } from 'src/shared';
import { CONST_ADMIN_USER } from '../../shared/platform-common-code.type';
import { PlatformGqlAuthGuard } from 'src/core';
import { User } from '../../common/decorators/user.decorator';
import { PlatformAdmin } from '../auth/plaform-admin.model';

@Resolver((of) => CommonCode)
@UseGuards(new PlatformGqlAuthGuard(...CONST_ADMIN_USER))
export class AdminCommonCodeResolver {
  constructor(
    @Inject(CommonCodeService)
    private readonly commonCodeService: CommonCodeService,
  ) {}

  /**
   * find all for admin
   * @param adminCommonCodeListDto
   * @param pagination
   * @returns
   */
  @Query((returns) => CommonCodePagination)
  async findAllCommonCodeForAdmin(
    @Args() adminCommonCodeListDto: AdminCommonCodeListDto,
    @Args({ name: 'pagination', nullable: true }) pagination: PaginatedRequest,
  ): Promise<CommonCodePagination> {
    return await this.commonCodeService.findAllForAdmin(
      adminCommonCodeListDto,
      pagination,
    );
  }

  /**
   * find one for admin
   * @param id
   * @returns
   */
  @Query((returns) => CommonCode)
  async findOneCommonCodeForAdmin(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<CommonCode> {
    return await this.commonCodeService.findOne(id);
  }
}
