import { Op } from 'sequelize';
import { ServiceModel } from '../db/models';

interface ICreateService {
  name: string;
}

interface IServiceService {
  findByID(id: string): Promise<ServiceModel | null>;
  findOneByName(name: string): Promise<ServiceModel | null>;
  findAllByName(name: string): Promise<ServiceModel[] | null>;
  create({ name }: ICreateService): Promise<ServiceModel | null>;
  createOrGet({ name }: ICreateService): Promise<ServiceModel>;
}

class ServiceService implements IServiceService {
  async findByID(id: string) {
    return ServiceModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  async findOneByName(name: string) {
    return ServiceModel.findOne({
      raw: true,
      where: {
        name,
      },
    });
  }

  async findAllByName(name: string) {
    return ServiceModel.findAll({
      raw: true,
      where: {
        name: {
          [Op.like]: name,
        },
      },
    });
  }

  async create({ name }: ICreateService) {
    const newService = await ServiceModel.create({
      name,
    });

    return newService.toJSON();
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
