// Errors
import HttpError from '../errors/http.error';

// Staff
import prisma from '../prisma';

// Third-party packages
import Prisma from '@prisma/client';

interface WeekendDays {
  monday?: boolean,
  tuesday?: boolean,
  wednesday?: boolean,
  thursday?: boolean,
  friday?: boolean,
  saturday?: boolean,
  sunday?: boolean,
}

interface IMasterWeekendDays {
  findByID(id: string): Promise<Prisma.MasterWeekendDays | null>;
  create(): Promise<Prisma.MasterWeekendDays>;
  update(
    id: string,
    { monday, tuesday, wednesday, thursday, friday, saturday, sunday }: WeekendDays
  ): Promise<Prisma.MasterWeekendDays | null>;
}

class MasterWeekendDaysService implements IMasterWeekendDays {
  async findByID(id: string) {
    return prisma.masterWeekendDays.findFirst({
      where: {
        id,
      },
    });
  }

  async create() {
    return prisma.masterWeekendDays.create({ data: {} });
  }

  async update(id: string, { monday, tuesday, wednesday, thursday, friday, saturday, sunday }: WeekendDays) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw new HttpError(404, 'Master weekend days not exists', { error: 'weekend days not exists' });
    }

    return prisma.masterWeekendDays.update({
      where: {
        id,
      },
      data: {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      },
    });
  }
}

export default new MasterWeekendDaysService();
