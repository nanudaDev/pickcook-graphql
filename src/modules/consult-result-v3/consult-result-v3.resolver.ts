import { Inject, Req } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ConsultResultV3 } from './consult-result-v3.model';
import { ConsultResultV3Service } from './consult-result-v3.service';
import { ConsultResultV3CreateDto } from './dto/consult-result-v3-create.dto';
import Request from 'express';
import { GqlRequest } from '../../common/decorators/request.decorator';

@Resolver((of) => ConsultResultV3)
export class ConsultResultV3Resolver {
  constructor(
    @Inject(ConsultResultV3Service)
    private readonly consultService: ConsultResultV3Service,
  ) {}

  /**
   * create consult
   * @param consultCreateDto
   * @param req
   * @returns
   */
  @Mutation((returns) => ConsultResultV3)
  async createConsult(
    @Args('createConsultDto') consultCreateDto: ConsultResultV3CreateDto,
    @GqlRequest() req: Request,
  ): Promise<ConsultResultV3> {
    return await this.consultService.createConsult(consultCreateDto, req);
  }
}
