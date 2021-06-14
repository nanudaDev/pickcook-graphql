import { Inject, UseGuards, ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConsultResultV3 } from './consult-result-v3.model';
import {
  ConsultResultV3Service,
  ConsultResultV3Pagination,
} from './consult-result-v3.service';
import { AdminConsultResultV3ListDto } from './dto/admin-consult-result-v3-list.dto';
import { PaginatedRequest } from '../../common/interfaces/pagination.type';
import { PlatformGqlAuthGuard } from '../../core/guard/auth-roles.guard';
import { CONST_ADMIN_USER } from 'src/shared';
import { AdminConsultResultV3UpdateDto } from './dto/admin-consult-result-v3-update.dto';
import { User } from 'src/common';
import { PlatformAdmin } from '../auth/plaform-admin.model';

@Resolver((of) => ConsultResultV3)
@UseGuards(new PlatformGqlAuthGuard(...CONST_ADMIN_USER))
export class AdminConsultResultV3Resolver {
  constructor(
    @Inject(ConsultResultV3Service)
    private readonly consultResultV3Service: ConsultResultV3Service,
  ) {}

  /**
   * find all for admin
   * @param adminConsultListDto
   * @param pagination
   * @returns
   */
  @Query((returns) => ConsultResultV3Pagination)
  async findAllConsultForAdmin(
    @Args('adminConsultListDto', { nullable: true })
    adminConsultListDto: AdminConsultResultV3ListDto,
    @Args('pagination', { nullable: true }) pagination?: PaginatedRequest,
  ): Promise<ConsultResultV3Pagination> {
    return await this.consultResultV3Service.findAllForAdmin(
      adminConsultListDto,
      pagination,
    );
  }

  /**
   * find one for admin
   * @param id
   * @returns
   */
  @Query((returns) => ConsultResultV3)
  async findOneConsultForAdmin(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ConsultResultV3> {
    return await this.consultResultV3Service.findOneForAdmin(id);
  }

  /**
   * update for admin
   * @param id
   * @param adminConsultUpdatedto
   * @returns
   */
  @Mutation((returns) => ConsultResultV3)
  async updateConsultForAdmin(
    @Args('id', ParseIntPipe) id: number,
    @Args('adminConsultUpdateDto')
    adminConsultUpdateDto: AdminConsultResultV3UpdateDto,
  ): Promise<ConsultResultV3> {
    return await this.consultResultV3Service.updateForAdmin(
      id,
      adminConsultUpdateDto,
    );
  }

  /**
   * assign myself consult
   * @param id
   * @param admin
   * @returns
   */
  @Mutation((returns) => ConsultResultV3)
  async assignConsultMyself(
    @Args('id', ParseIntPipe) id: number,
    @User() admin: PlatformAdmin,
  ): Promise<ConsultResultV3> {
    console.log(admin);
    return await this.consultResultV3Service.assignMyself(id, admin.no);
  }
}
