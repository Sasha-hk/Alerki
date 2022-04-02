interface IUser {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pictureID: string;
  password: string;
  profileType: 'client' | 'master';
  clientID: string;
  masterID: string;
  banned: boolean;
}

export default IUser;
