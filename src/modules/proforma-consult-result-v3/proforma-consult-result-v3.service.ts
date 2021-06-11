import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { ProformaConsultResultV3 } from './proforma-consult-result-v3.model';
import { Repository, EntityManager } from 'typeorm';
import { ProformaConsultResultV3CreateDto } from './dto';
import { ProformaEventTrackerService } from '../proforma-event-tracker/proforma-event-tracker.service';

@Injectable()
export class ProformaConsultResultV3Service {
  constructor(
    @InjectRepository(ProformaConsultResultV3)
    private readonly proformaV3Repo: Repository<ProformaConsultResultV3>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
    private readonly proformaTrackerService: ProformaEventTrackerService,
  ) {}

  /**
   * create new proforma for landing page
   * @param proformaConsultResultV3CreateDto
   * @returns
   */
  async createProforma(
    proformaConsultResultV3CreateDto: ProformaConsultResultV3CreateDto,
  ): Promise<ProformaConsultResultV3> {
    const proforma = await this.entityManager.transaction(
      async (entityManager) => {
        let proforma = new ProformaConsultResultV3(
          proformaConsultResultV3CreateDto,
        );
        proforma = await entityManager.save(proforma);
        //   create new tracker
        this.proformaTrackerService.createRecord(proforma);
        return proforma;
      },
    );
    return proforma;
  }

  /**
   * find one
   * @param id
   * @returns
   */
  async findOneProforma(id: number): Promise<ProformaConsultResultV3> {
    const proforma = await this.proformaV3Repo
      .createQueryBuilder('proforma')
      .CustomInnerJoinAndSelect(['fnbOwnerStatusCode'])
      .where('proforma.id = :id', { id: id })
      .getOne();

    if (!proforma) throw new NotFoundException();

    return proforma;
  }
}
