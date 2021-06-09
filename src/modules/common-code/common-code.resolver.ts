import { Inject } from '@nestjs/common';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { CommonCode } from './common-code.model';
import { CommonCodeService } from './common-code.service';
import { CommonCodeListDto } from './dto';

@Resolver((of) => CommonCode)
export class CommonCodeResolver {
  constructor(
    @Inject(CommonCodeService)
    private readonly commonCodeService: CommonCodeService,
  ) {}

  /**
   * find all for common user
   * @param commonCodeListDto
   * @returns
   */
  @Query((returns) => [CommonCode])
  async findAllCommonCodeCommon(
    @Args({ nullable: true }) commonCodeListDto: CommonCodeListDto,
  ): Promise<CommonCode[]> {
    return await this.commonCodeService.findAll(commonCodeListDto);
  }
}
