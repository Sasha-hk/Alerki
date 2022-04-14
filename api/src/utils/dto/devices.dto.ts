// Interfaces
import IAuth from '../../interfaces/db/auth.interface';

// Third-party packages
import Prisma from '@prisma/client';

export interface IDevicesDto extends Pick<IAuth, 'id' | 'userID' | 'deviceName' | 'createdAt'> {}

/**
 * This data transfer object intended to transfer data that belongs only current user
 */
class DevicesDto {
  devices!: IDevicesDto[];

  /**
   * Private user DTO constructor
   * @param authData User date
   */
  constructor(authData: Prisma.Auth[]) {
    this.devices = [];

    if (authData.length !== 0) {
      for (const i of authData) {
        this.devices.push({
          id: i.id,
          userID: i.userID,
          deviceName: i.deviceName,
          createdAt: i.createdAt,
        });
      }
    }
  }
}

export default DevicesDto;
