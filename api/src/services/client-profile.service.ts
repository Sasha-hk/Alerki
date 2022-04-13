// Errors
import ClientProfileError from '../errors/client-profile.error';

// Staff
import prisma from '../prisma';

// Third-party packages
import Prisma from '@prisma/client';

interface IClientProfileService {
  createProfile(): Promise<Prisma.ClientProfile>;
  findByID(id: string): Promise<Prisma.ClientProfile | null>;
  findAvailableByID(id: string): Promise<Prisma.ClientProfile | null>;
  block(id: string): Promise<void>;
  unblock(id: string): Promise<void>;
}

class ClientProfileService implements IClientProfileService {
  async createProfile() {
    return prisma.clientProfile.create({ data: {} });
  }

  async findByID(id: string) {
    return prisma.clientProfile.findFirst({
      where: {
        id,
      },
    });
  }

  async findAvailableByID(id: string) {
    return prisma.clientProfile.findFirst({
      where: {
        id,
        available: true,
      },
    });
  }

  async block(id: string) {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw ClientProfileError.NotFound();
    }

    prisma.clientProfile.update(
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

  async unblock(id: string): Promise<void> {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw ClientProfileError.NotFound();
    }

    prisma.clientProfile.update(
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
}

export default new ClientProfileService();
