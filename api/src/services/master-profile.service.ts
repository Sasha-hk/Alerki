// Errors
import MasterProfileError from '../errors/master-profile.error';

// Service
import masterWeekendDaysService from './master-weekend-days.service';

// Staff
import prisma from '../prisma';

// Third-party packages
import Prisma from '@prisma/client';

interface IUpdateProfile {
  biography?: string,
  startTime?: number,
  endTime?: number,
  delayBefore?: number,
  delayAfter?: number,
}

interface IMasterProfileService {
  createProfile(): Promise<Prisma.MasterProfile>;
  findByID(id: string): Promise<Prisma.MasterProfile | null>;
  findAvailableByID(id: string): Promise<Prisma.MasterProfile | null>;
  block(id: string): Promise<void>;
  unblock(id: string): Promise<void>;
  update(id: string, { biography }: IUpdateProfile): Promise<Prisma.MasterProfile>;
}

class MasterProfileService implements IMasterProfileService {
  async createProfile() {
    const weekendDays = await masterWeekendDaysService.create();

    return prisma.masterProfile.create({ data: { weekendDaysID: weekendDays.id } });
  }

  async findByID(id: string) {
    return prisma.masterProfile.findFirst({
      where: {
        id,
      },
    });
  }

  async findAvailableByID(id: string) {
    return prisma.masterProfile.findFirst({
      where: {
        id,
        available: true,
      },
    });
  }

  async block(id: string) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw MasterProfileError.NotFound();
    }

    prisma.masterProfile.update(
      {
        where: {
          id,
        },
        data: {
          available: false,
        },
      },
    );
  }

  async unblock(id: string) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw MasterProfileError.NotFound();
    }

    prisma.masterProfile.update(
      {
        where: {
          id,
        },
        data: {
          available: true,
        },
      },
    );
  }

  async update(id: string, updateOptions: IUpdateProfile) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw MasterProfileError.NotFound();
    }

    await prisma.masterProfile.update(
      {
        where: {
          id,
        },
        data: updateOptions,
      },
    );

    return await this.findByID(id) as Prisma.MasterProfile;
  }
}

export default new MasterProfileService();
