import prisma from '../prisma';
import Prisma from '@prisma/client';

interface ICreateService {
  name: string;
}

interface IServiceService {
  findByID(id: string): Promise<Prisma.Service | null>;
  findOneByName(name: string): Promise<Prisma.Service | null>;
  findAllByName(name: string): Promise<Prisma.Service[] | null>;
  create({ name }: ICreateService): Promise<Prisma.Service | null>;
  createOrGet({ name }: ICreateService): Promise<Prisma.Service>;
}

class ServiceService implements IServiceService {
  async findByID(id: string) {
    return prisma.service.findFirst({
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string) {
    return prisma.service.findFirst({
      where: {
        name,
      },
    });
  }

  async findAllByName(name: string) {
    return prisma.service.findMany({
      where: {
        name,
      },
    });
  }

  async create({ name }: ICreateService) {
    return prisma.service.create({
      data: {
        name,
      },
    });
  }

  async createOrGet({ name }: ICreateService) {
    const candidate = await this.findOneByName(name);

    if (!candidate) {
      return this.create({ name });
    }

    return candidate;
  }
}

export default new ServiceService();
