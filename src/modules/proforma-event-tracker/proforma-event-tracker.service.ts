import { Injectable, NotFoundException } from '@nestjs/common';
import { ProformaEventTracker } from './proforma-event-tracker.model';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { ORDER_BY_VALUE } from '../../common';
import { ProformaConsultResultV3 } from '../proforma-consult-result-v3/proforma-consult-result-v3.model';

class AdminProformaEventTrackerCountClass {
  newFnbOwnerCount: number;
  curFnbOwnerCount: number;
}
@Injectable()
export class ProformaEventTrackerService {
  constructor(
    @InjectRepository(ProformaEventTracker)
    private readonly proformaEventTrackerRepo: Repository<ProformaEventTracker>,
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}
  /**
   * create new record
   * @param proforma
   * @returns
   */
  async createRecord(
    proforma: ProformaConsultResultV3,
  ): Promise<ProformaEventTracker> {
    let newRecord = new ProformaEventTracker();
    if (!proforma.ipAddress) {
      throw new NotFoundException();
    }
    const checkIpAddress = await this.proformaEventTrackerRepo
      .createQueryBuilder('tracker')
      .where('tracker.ipAddress = :ipAddress', {
        ipAddress: proforma.ipAddress,
      })
      .orderBy('tracker.id', ORDER_BY_VALUE.DESC)
      .getOne();
    if (!checkIpAddress) {
      newRecord.proformaConsultId = proforma.id;
      newRecord.fnbOwnerStatus = proforma.fnbOwnerStatus;
      newRecord.ipAddress = proforma.ipAddress;
      newRecord = await this.proformaEventTrackerRepo.save(newRecord);
    }
    if (checkIpAddress) {
      const checkTime = this.__check_if_over_thirty_minutes(checkIpAddress);
      if (checkTime) {
        newRecord.proformaConsultId = proforma.id;
        newRecord.ipAddress = proforma.ipAddress;
        newRecord.fnbOwnerStatus = proforma.fnbOwnerStatus;
        newRecord = await this.proformaEventTrackerRepo.save(newRecord);
      }
    }
    if (proforma instanceof ProformaConsultResultV3) {
      // TODO: 가변적으로 가져가는 것을 만든다
      newRecord.versionNumber = 3;
    }
    return newRecord;
  }

  /**
   * check if over thirty minutes since last interaction
   * @param tracker
   * @returns
   */
  private __check_if_over_thirty_minutes(tracker: ProformaEventTracker) {
    const date = new Date();
    const halfAnHour = 1000 * 60 * 30;
    const trackerDate = tracker.created;
    const differenceInTime = date.getTime() - trackerDate.getTime();
    if (differenceInTime > halfAnHour) {
      return true;
    } else {
      return false;
    }
  }
}
