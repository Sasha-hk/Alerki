// Staff
import prisma from '../prisma';

// Errors
import MasterServiceError from '../errors/master-service.error';

// Third-party packages
import Prisma from '@prisma/client';

interface CreateService {
  serviceID: string,
  masterID: string,
  duration: number,
  price: number,
  currency: string,
  locationLat: number,
  locationLng: number,
}

interface UpdateService {
  serviceID?: string,
  masterID?: string,
  duration?: number,
  price?: number,
  currency?: string,
  locationLat?: number,
  locationLng?: number,
}

interface IMasterServiceService {
  checkBelongs(masterID: string, serviceID: string): any;
  findByID(id: string): Promise<Prisma.MasterService | null>;
  create(fields: CreateService): Promise<Prisma.MasterService>;
  update(masterID: string, serviceID: string, fields: UpdateService): Promise<Prisma.MasterService>;
  delete(masterID: string, serviceID: string): void;
}

class MasterServiceService implements IMasterServiceService {
  async checkBelongs(masterID: string, masterServiceID: string) {
    const candidate = await this.findByID(masterServiceID);

    if (!candidate) {
      throw MasterServiceError.NotFound();
    }

    if (candidate?.masterID !== masterID) {
      throw MasterServiceError.ServiceNotBelongsToUser();
    }
  }

  async findByID(serviceID: string) {
    return prisma.masterService.findFirst({
      where: {
        id: serviceID,
      },
    });
  }

  async create(fields: CreateService) {
    return prisma.masterService.create({
      data: fields,
    });
  }

  async update(masterID: string, masterServiceID: string, fields: UpdateService) {
    await this.checkBelongs(masterID, masterServiceID);

    return prisma.masterService.update({
      where: {
        id: masterServiceID,
      },
      data: fields,
    });
  }

  async delete(masterID: string, masterServiceID: string) {
    await this.checkBelongs(masterID, masterServiceID);

    return prisma.masterService.delete({
      where: {
        id: masterServiceID,
      },
    });
  }
}

export default new MasterServiceService();
