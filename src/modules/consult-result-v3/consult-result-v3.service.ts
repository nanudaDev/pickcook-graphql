import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ConsultResultV3 } from './consult-result-v3.model';
import { Repository, EntityManager } from 'typeorm';
import { ConsultResultV3CreateDto } from './dto';
import { ProformaConsultResultV3 } from '../proforma-consult-result-v3/proforma-consult-result-v3.model';
import { PaginatedResponse, YN } from 'src/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ConsultResultV3Pagination extends PaginatedResponse<ConsultResultV3> {
  @Field(() => [ConsultResultV3], { nullable: true })
  items?: ConsultResultV3[];
  @Field(() => Int, { nullable: true })
  totalCount?: number;
}

@Injectable()
export class ConsultResultV3Service {
  constructor(
    @InjectRepository(ConsultResultV3)
    private readonly consultRepo: Repository<ConsultResultV3>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  /**
   * create consult for pickcook user
   * @param consultResultCreateDto
   * @param req
   * @returns
   */
  async createConsult(
    consultResultCreateDto: ConsultResultV3CreateDto,
    req: Request,
  ): Promise<ConsultResultV3> {
    const consult = await this.entityManager.transaction(
      async (entityManager) => {
        const checkConsult = await this.consultRepo.findOne({
          proformaConsultResultId:
            consultResultCreateDto.proformaConsultResultId,
        });
        if (checkConsult) throw new NotFoundException();
        let proforma = await entityManager
          .getRepository(ProformaConsultResultV3)
          .findOne(consultResultCreateDto.proformaConsultResultId);
        if (!proforma) throw new NotFoundException();
        let consult = new ConsultResultV3(consultResultCreateDto);
        consult.fnbOwnerStatus = proforma.fnbOwnerStatus;
        //   await send sms notification
        // this.smsNotificationService.sendConsultNotificationV2(consult, req);
        // // send slack notification
        // this.slackNotificationService.sendAdminConsultNoticationV2(consult);
        consult = await entityManager.save(consult);
        proforma.isConsultYn = YN.YES;
        proforma = await entityManager.save(proforma);
        return consult;
      },
    );
    return consult;
  }
}
