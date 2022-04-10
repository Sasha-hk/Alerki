import { UserPictureModel } from '../db/models';
import UserPictureError from '../errors/user-picture.error';

interface IUserPictureService {
  findPicture(id: string): Promise<UserPictureModel | null>;
  savePicture(picture: Buffer): Promise<UserPictureModel>;
  updatePicture(id: string, picture: Buffer): Promise<any>;
}

class UserPictureService implements IUserPictureService {
  async findPicture(id: string) {
    return UserPictureModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  async savePicture(picture: Buffer) {
    return UserPictureModel.create({
      picture,
    });
  }

  async updatePicture(id: string, picture: Buffer) {
    const candidate = await this.findPicture(id);

    if (!candidate) {
      throw UserPictureError.NotFound();
    }

    await UserPictureModel.update(
      {
        picture,
      },
      {
        where: {
          id,
        },
      },
    );

    return this.findPicture(id);
  }
}

export default new UserPictureService();
