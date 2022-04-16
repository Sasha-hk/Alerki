// Third-party packages
import Prisma from '@prisma/client';

// Utils
import MasterProfileDto, { IMasterDto } from './master-profile.dto';

interface IPrivateUserDto extends Omit<Prisma.User, 'password' | 'banned'> {
  master?: IMasterDto,
}

/**
 * This data transfer object intended to transfer data that belongs only current user
 */
class PrivateUserDto implements IPrivateUserDto {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  pictureID: string | null;
  profileType: 'client' | 'master';
  clientID: string;
  masterID: string | null;
  master?: IMasterDto;
  createdAt: Date;
  updatedAt: Date;

  /**
   * Private user DTO constructor
   * @param user User date
   * @param master Not required master profile
   */
  constructor(user: Prisma.User, master?: Prisma.MasterProfile) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.pictureID = user.pictureID;
    this.profileType = user.profileType || null;
    this.clientID = user.clientID;
    this.masterID = user.masterID;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;

    if (master) {
      this.master = new MasterProfileDto(master);
    }
  }
}

export default PrivateUserDto;
