// Errors
import UserPictureError from '../errors/user-picture.error';

// Staff
import prisma from '../prisma';

// Third-party packages
import Prisma from '@prisma/client';
import { UploadedFile } from 'express-fileupload';

export type IPicture = UploadedFile | undefined;

interface ISavePicture {
  id?: string,
  picture: IPicture,
}

interface IUserPictureService {
  findPicture(id: string): Promise<Prisma.UserPicture | null>;
  createPicture(picture: IPicture): Promise<Prisma.UserPicture>;
  updatePicture(id: string, picture: IPicture): Promise<Prisma.UserPicture>;
  savePicture({ id, picture }: ISavePicture): Promise<Prisma.UserPicture>;
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
    return prisma.userPicture.findFirst({
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
    return prisma.userPicture.create({
      data: {
        picture: picture?.data,
      },
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

    return prisma.userPicture.update({
      where: {
        id,
      },
      data: {
        picture: picture?.data,
      },
    });
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
