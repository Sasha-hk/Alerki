import { Op } from 'sequelize';
import { ServiceModel } from '../db/models';

interface ICreateService {
  name: string;
}

interface IServiceService {
  findByID(id: string): Promise<ServiceModel>;
  findOneByName(name: string): Promise<ServiceModel>;
  findAllByName(name: string): Promise<ServiceModel[]>;
  create({ name }: ICreateService): Promise<ServiceModel>;
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
          [Op.like]: '%' + name + '%',
        },
      },
    });
  }

  async create({ name }: ICreateService) {
    const newService = await ServiceModel.create({
      name,
    });

    console.log(newService);
    return newService;
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
