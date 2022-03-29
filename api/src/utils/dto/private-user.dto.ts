import IUser from '../../interfaces/db/models/user.interface';
import { UserModel } from '../../db/models';

interface IPrivateUserDto extends Omit<IUser, 'password'> {}

/**
 * This data transfer object intended to transfer data that belongs only current user
 */
class PrivateUserDto implements IPrivateUserDto {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pictureID: number;
  profileType: 'client' | 'master';
  clientID: number;
  masterID: number;
  banned: boolean;

  /**
   * Private user DTO constructor
   * @param {UserModel} user User date
   */
  constructor(user: UserModel) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.pictureID = user.pictureID;
    this.profileType = user.profileType;
    this.clientID = user.clientID;
    this.masterID = user.masterID;
    this.banned = user.banned;
  }
}

export default PrivateUserDto;
