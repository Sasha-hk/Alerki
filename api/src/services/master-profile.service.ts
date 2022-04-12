// Errors
import MasterProfileError from '../errors/master-profile.error';

// Models
import { MasterProfileModel } from '../db/models';

interface IUpdateProfile {
  biography: string,
}

interface IMasterProfileService {
  createProfile(): Promise<MasterProfileModel>;
  findByID(id: string): Promise<MasterProfileModel | null>;
  findAvailableByID(id: string): Promise<MasterProfileModel | null>;
  block(id: string): Promise<void>;
  unblock(id: string): Promise<void>;
  update(id: string, { biography }: IUpdateProfile): Promise<MasterProfileModel>;
}

class MasterProfileService implements IMasterProfileService {
  async createProfile(): Promise<MasterProfileModel> {
    const newProfile = await MasterProfileModel.create();

    return newProfile.toJSON();
  }

  async findByID(id: string): Promise<MasterProfileModel | null> {
    return MasterProfileModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  async findAvailableByID(id: string): Promise<MasterProfileModel | null> {
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

  async update(id: string, { biography }: IUpdateProfile): Promise<MasterProfileModel> {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw MasterProfileError.NotFound();
    }

    await MasterProfileModel.update(
      {
        biography,
      },
      {
        where: {
          id,
        },
      },
    );

    return await this.findByID(id) as MasterProfileModel;
  }
}

export default new MasterProfileService();
