import { UserPictureModel } from '../db/models';
import UserPictureError from '../errors/user-picture.error';

interface ISavePicture {
  id?: string,
  picture: Buffer,
}

interface IUserPictureService {
  findPicture(id: string): Promise<UserPictureModel | null>;
  createPicture(picture: Buffer): Promise<UserPictureModel>;
  updatePicture(id: string, picture: Buffer): Promise<any>;
  savePicture({ id, picture }: ISavePicture): Promise<UserPictureModel>;
}

/**
 * User picture service
 */
class UserPictureService implements IUserPictureService {
  /**
   * Find picture by ID
   * @param id Picture ID
   * @returns UserPictureModel
   */
  async findPicture(id: string) {
    return UserPictureModel.findOne({
      raw: true,
      where: {
        id,
      },
    });
  }

  /**
   * Create record with user picture
   * @param picture Picture
   * @returns UserPictureModel
   */
  async createPicture(picture: Buffer) {
    return UserPictureModel.create({
      picture,
    });
  }

  /**
   * Update picture
   * @param id Picture ID
   * @param picture Picture
   * @returns UserPictureModel
   */
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

  /**
   * Create of update picture
   * @param options Picture and id if exists
   * @returns UserPictureModel
   */
  async savePicture({ id, picture }: ISavePicture) {
    // If id exists try to update picture else create new
    if (id) {
      const candidate = await this.findPicture(id);

      if (candidate) {
        return this.updatePicture(id, picture);
      }

      return this.updatePicture(id, picture);
    }

    return this.createPicture(picture);
  }
}

export default new UserPictureService();
