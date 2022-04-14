interface IUser {
  id: string;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  pictureID: string | null;
  password: string | null;
  profileType: 'client' | 'master';
  clientID: string;
  masterID: string | null;
  banned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
