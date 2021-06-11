import { Inject, ParseIntPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProformaConsultResultV3 } from './proforma-consult-result-v3.model';
import { ProformaConsultResultV3Service } from './proforma-consult-result-v3.service';
import { ProformaConsultResultV3CreateDto } from './dto/proforma-consult-v3-create.dto';

@Resolver((of) => ProformaConsultResultV3)
export class ProformaResolver {
  constructor(
    @Inject(ProformaConsultResultV3Service)
    private readonly proformaService: ProformaConsultResultV3Service,
  ) {}

  /**
   * find one for admi
   * @param id
   * @returns
   */
  @Query((returns) => ProformaConsultResultV3)
  async findOneProforma(
    @Args('id', ParseIntPipe) id: number,
  ): Promise<ProformaConsultResultV3> {
    return await this.proformaService.findOneProforma(id);
  }

  /**
   * create proforma
   * @param proformaConsultCreateDto
   * @returns
   */
  @Mutation((returns) => ProformaConsultResultV3)
  async createProforma(
    @Args('proformaConsultCreateDto')
    proformaConsultCreateDto: ProformaConsultResultV3CreateDto,
  ): Promise<ProformaConsultResultV3> {
    return await this.proformaService.createProforma(proformaConsultCreateDto);
  }
}
