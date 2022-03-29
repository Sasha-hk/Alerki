/* eslint camelcase: 0 */
import axios from 'axios';
import jwt from 'jsonwebtoken';
import AuthError from '../errors/auth.error';

interface IGoogleTokens {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
  id_token: string;
}

export interface IGoogleResponse extends IGoogleTokens {
  decoded: {
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
    given_name: string;
    family_name: string;
    locale: string;
    iat: number;
    exp: number;
  }
}

export async function obtainToken(code: string): Promise<IGoogleTokens> {
  const response = await axios({
    method: 'post',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    data: {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URL,
      grant_type: 'authorization_code',
    },
  }).catch(e => {
    throw AuthError.WithGoogleError(e.response.data);
  });

  return response.data as IGoogleTokens;
}

export default async function authenticateWithGoogle(code: string): Promise<IGoogleResponse> {
  const tokens: IGoogleTokens = await obtainToken(code);

  return {
    decoded: jwt.decode(tokens.id_token),
    ...tokens,
  } as IGoogleResponse;
}
