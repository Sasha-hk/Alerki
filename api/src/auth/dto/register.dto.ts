import Prisma from '@prisma/client';

interface IRegister extends Pick<Prisma.User, 'username' | 'email' | 'profileType' | 'password'> {}

export class RegisterDto implements IRegister {
  readonly username: string;
  readonly email: string;
  readonly profileType: Prisma.ProfileType;
  readonly password: string;
}
