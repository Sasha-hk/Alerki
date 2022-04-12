import { UserPictureModel } from '../db/models';
import UserPictureError from '../errors/user-picture.error';
import { UploadedFile } from 'express-fileupload';

export type IPicture = UploadedFile | undefined;

interface ISavePicture {
  id?: string,
  picture: IPicture,
}

interface IUserPictureService {
  findPicture(id: string): Promise<UserPictureModel | null>;
  createPicture(picture: IPicture): Promise<UserPictureModel>;
  updatePicture(id: string, picture: IPicture): Promise<UserPictureModel>;
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
  async createPicture(picture: IPicture) {
    return UserPictureModel.create({
      picture: picture?.data,
    });
  }

  /**
   * Update picture
   * @param id Picture ID
   * @param picture Picture
   * @returns UserPictureModel
   */
  async updatePicture(id: string, picture: IPicture) {
    const candidate = await this.findPicture(id);

    if (!candidate) {
      throw UserPictureError.NotFound();
    }

    await UserPictureModel.update(
      {
        picture: picture?.data,
      },
      {
        where: {
          id,
        },
      },
    );

    return await this.findPicture(id) as UserPictureModel;
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
