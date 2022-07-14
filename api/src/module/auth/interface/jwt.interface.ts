import Prisma from '@prisma/client';

/**
 * JWT token data (access or refresh)
 */
export interface JwtTokenData extends Pick<Prisma.User, 'id'> {}

/**
 * Generated JWT tokens (access and refresh)
 */
export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}
