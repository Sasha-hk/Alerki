import Prisma from '@prisma/client';

export interface JwtPayload extends Pick<Prisma.User, 'username' | 'email'> {}
