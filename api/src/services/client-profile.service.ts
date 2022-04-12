import { ClientProfileModel } from '../db/models';
import ClientProfileError from '../errors/client-profile.error';

interface IClientProfileService {
  createProfile(): Promise<ClientProfileModel>;
  findByID(id: string): Promise<ClientProfileModel | null>;
  findAvailableByID(id: string): Promise<ClientProfileModel | null>;
  block(id: string): Promise<void>;
  unblock(id: string): Promise<void>;
}

class ClientProfileService implements IClientProfileService {
  async createProfile(): Promise<ClientProfileModel> {
    const newProfile = await ClientProfileModel.create({
      raw: true,
    });

    return newProfile.toJSON();
  }

  async findByID(id: string): Promise<ClientProfileModel | null> {
    return ClientProfileModel.findOne({
      where: {
        id,
      },
    });
  }

  async findAvailableByID(id: string): Promise<ClientProfileModel | null> {
    return ClientProfileModel.findOne({
      where: {
        id,
        available: true,
      },
    });
  }

  async block(id: string): Promise<void> {
    const candidate = await this.findByID(id);

    if (!candidate) {
      throw ClientProfileError.NotFound();
    }

    ClientProfileModel.update(
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
      throw ClientProfileError.NotFound();
    }

    ClientProfileModel.update(
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

export default new ClientProfileService();
