// Interfaces
import IUser from '../../interfaces/db/models/user.interface';

// Third-party packages
import Prisma from '@prisma/client';

interface IPrivateUserDto extends Omit<IUser, 'password'> {}

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
  banned: boolean;

  /**
   * Private user DTO constructor
   * @param user User date
   */
  constructor(user: Prisma.User) {
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
    this.banned = user.banned;
  }
}

export default PrivateUserDto;
