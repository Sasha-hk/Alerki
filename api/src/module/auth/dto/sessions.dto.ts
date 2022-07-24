import Prisma from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

interface ISession extends Pick<
  Prisma.Session,
  'id' |
  'fingerprint' |
  'ip' |
  'deviceName' |
  'createdAt' |
  'updatedAt'
> {}

export class Session implements ISession {
  id: string;
  fingerprint: string;
  ip: string;
  deviceName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(session: Prisma.Session) {

  }
}

export class Sessions {

}
