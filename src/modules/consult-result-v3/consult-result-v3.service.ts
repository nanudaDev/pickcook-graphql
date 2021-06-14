import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ConsultResultV3 } from './consult-result-v3.model';
import { Repository, EntityManager } from 'typeorm';
import { AdminConsultResultV3UpdateDto, ConsultResultV3CreateDto } from './dto';
import { ProformaConsultResultV3 } from '../proforma-consult-result-v3/proforma-consult-result-v3.model';
import { PaginatedResponse, YN } from 'src/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AdminConsultResultV3ListDto } from './dto/admin-consult-result-v3-list.dto';
import { PaginatedRequest } from '../../common/interfaces/pagination.type';
import { PlatformAdmin } from '../auth/plaform-admin.model';

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
    @InjectRepository(PlatformAdmin, 'platform')
    private readonly platformAdminRepo: Repository<PlatformAdmin>,
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

  /**
   * find all for admin
   * @param adminConsultResultV3ListDto
   * @param pagination
   * @returns
   */
  async findAllForAdmin(
    adminConsultResultV3ListDto: AdminConsultResultV3ListDto,
    pagination: PaginatedRequest,
  ): Promise<ConsultResultV3Pagination> {
    const qb = this.consultRepo
      .createQueryBuilder('consult')
      .CustomInnerJoinAndSelect([
        'fnbOwnerCodeStatus',
        'consultCodeStatus',
        'proformaConsultResult',
      ])
      .AndWhereLike(
        'consult',
        'name',
        adminConsultResultV3ListDto.name,
        adminConsultResultV3ListDto.exclude('name'),
      )
      .AndWhereLike(
        'consult',
        'phone',
        adminConsultResultV3ListDto.phone,
        adminConsultResultV3ListDto.exclude('phone'),
      )
      .AndWhereLike(
        'consult',
        'fnbOwnerStatus',
        adminConsultResultV3ListDto.fnbOwnerStatus,
        adminConsultResultV3ListDto.exclude('fnbOwnerStatus'),
      )
      .AndWhereLike(
        'consult',
        'consultStatus',
        adminConsultResultV3ListDto.consultStatus,
        adminConsultResultV3ListDto.exclude('consultStatus'),
      )
      .Paginate(pagination)
      .WhereAndOrder(adminConsultResultV3ListDto)
      .getManyAndCount();

    const [items, totalCount] = await qb;

    return { items, totalCount };
  }

  /**
   * update for admin
   * @param id
   * @param adminConsultResultV3UpdateDto
   * @returns
   */
  async updateForAdmin(
    id: number,
    adminConsultResultV3UpdateDto: AdminConsultResultV3UpdateDto,
  ): Promise<ConsultResultV3> {
    let consult = await this.consultRepo.findOne(id);
    if (!consult) throw new NotFoundException();
    consult = consult.set(adminConsultResultV3UpdateDto);
    consult = await this.consultRepo.save(consult);
    return consult;
  }

  /**
   * find one for admin
   * @param id
   * @returns
   */
  async findOneForAdmin(id: number): Promise<ConsultResultV3> {
    const consult = await this.consultRepo
      .createQueryBuilder('consult')
      .CustomInnerJoinAndSelect([
        'fnbOwnerCodeStatus',
        'consultCodeStatus',
        'proformaConsultResult',
      ])
      .where('consult.id = :id', { id })
      .getOne();
    if (!consult) {
      throw new NotFoundException();
    }
    if (consult && consult.adminId) {
      consult.admin = await this.platformAdminRepo.findOne(consult.adminId);
    }

    return consult;
  }

  /**
   * assign myself admin
   * @param id
   * @param adminId
   * @returns
   */
  async assignMyself(id: number, adminId: number): Promise<ConsultResultV3> {
    let consult = await this.consultRepo.findOne(id);
    if (!consult) throw new NotFoundException();
    consult.adminId = adminId;
    consult = await this.consultRepo.save(consult);
    return consult;
  }
}
