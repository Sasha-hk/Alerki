interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pictureID: number;
  password: string;
  profileType: 'client' | 'master';
  clientID: number;
  masterID: number;
  banned: boolean;
}

export default IUser;
