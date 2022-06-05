/* eslint-disable camelcase */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';

import { UserService } from '@Module/user/user.service';

export interface GoogleResponse {
  email: string,
  email_verified: boolean,
  name: string,
  picture: string,
  given_name: string,
  family_name: string,
  locale: string,
  access_token: string,
  refresh_token: string,
  expires_in: number,
  scope: string,
  token_type: string,
  id_token: string,
}

@Injectable()
export class OAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Google OAuth2.0
   *
   * @param code code from client
   */
  async google(code: string): Promise<GoogleResponse> {
    const googleResponse = await axios({
      method: 'post',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      data: {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URL,
        grant_type: 'authorization_code',
      },
    }).catch(() => {
      throw new HttpException({ message: 'could not authenticate with Google' }, HttpStatus.BAD_REQUEST);
    });

    const decoded: any = this.jwtService.decode(googleResponse.data?.id_token);

    return {
      ...googleResponse,
      ...decoded,
    };
  }
}
