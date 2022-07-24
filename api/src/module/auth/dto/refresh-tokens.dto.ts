import {
  IsString,
  Length,
} from 'class-validator';

import { userConfig } from '@Config/api/params.config';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokensDto {
  @ApiProperty(userConfig.fingerprint)
  @IsString()
  @Length(userConfig.fingerprint.length)
  readonly fingerprint: string;
}
