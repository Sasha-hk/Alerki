// Third-party packages
import Prisma from '@prisma/client';

export interface IMasterDto extends Omit<Prisma.MasterProfile, 'available'> {}
interface IMasterProfileDto extends IMasterDto {}

/**
 * Master profile DTO
 */
class MasterProfileDto implements IMasterProfileDto {
  id: string;
  biography: string | null;
  weekendDaysID: string | null;
  startTime: number | null;
  endTime: number | null;
  delayBefore: number | null;
  delayAfter: number | null;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Master profile DTO constructor
   * @param master Master profile data
   */
  constructor(master: Prisma.MasterProfile) {
    this.id = master.id;
    this.biography = master.biography;
    this.weekendDaysID = master?.weekendDaysID;
    this.startTime = master?.startTime;
    this.endTime = master?.endTime;
    this.delayBefore = master?.delayBefore;
    this.delayAfter = master?.delayAfter;
    this.createdAt = master.createdAt;
    this.updatedAt = master.updatedAt;
  }
}

export default MasterProfileDto;
