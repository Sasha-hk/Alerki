import Prisma from '@prisma/client';

export interface JWT extends Pick<Prisma.User, 'id' | 'username' | 'email'> {}
