import { MasterProfileModel } from '../db/models';
import MasterProfileError from '../errors/master-profile.error';

interface IMasterProfileService {
  createProfile(): Promise<MasterProfileModel>;
  findByID(id: string): Promise<MasterProfileModel | null>;
  findAvailableByID(id: string): Promise<MasterProfileModel | null>;
  block(id: string): Promise<void>;
  unblock(id: string): Promise<void>;
}

class MasterProfileService implements IMasterProfileService {
  async createProfile(): Promise<MasterProfileModel> {
    const newProfile = await MasterProfileModel.create();

    return newProfile.toJSON();
  }

  async findByID(id: string): Promise<MasterProfileModel> {
    return MasterProfileModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  async findAvailableByID(id: string): Promise<MasterProfileModel> {
    return MasterProfileModel.findOne({
      raw: true,
      where: {
        id,
        available: true,
      },
    });
  }

  async block(id: string): Promise<void> {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw MasterProfileError.NotFound();
    }

    MasterProfileModel.update(
      {
        available: false,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async unblock(id: string): Promise<void> {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw MasterProfileError.NotFound();
    }

    MasterProfileModel.update(
      {
        available: true,
      },
      {
        where: {
          id,
        },
      },
    );
  }
}

export default new MasterProfileService();
