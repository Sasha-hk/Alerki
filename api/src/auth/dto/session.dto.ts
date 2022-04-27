import Prisma from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

interface ISession extends Pick<Prisma.Session, 'id' | 'deviceName' | 'createdAt' | 'updatedAt'> {}

export class SessionDto implements ISession {
  @ApiProperty({
    description: 'Session ID',
    maxLength: 36,
    type: 'string',
    example: '123e4567-e89b-12d3-a456-426614174847',
  })
  readonly id: string;

  @ApiProperty({
    description: 'Device name',
    maxLength: 30,
    type: 'string',
    example: 'IPhone XR',
  })
  readonly deviceName: string;

  readonly createdAt: Date;

  readonly updatedAt: Date;
}
