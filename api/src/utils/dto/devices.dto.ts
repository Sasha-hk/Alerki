import IAuth from '../../interfaces/db/models/auth.interface';
import { AuthModel } from '../../db/models';

export interface IDevicesDto extends Pick<IAuth, 'id' | 'deviceName' | 'userID'> {
  createdAt: string;
  updatedAt: string;
}

/**
 * This data transfer object intended to transfer data that belongs only current user
 */
class DevicesDto {
  devices!: IDevicesDto[];

  /**
   * Private user DTO constructor
   * @param {AuthModel} authData User date
   */
  constructor(authData: AuthModel[]) {
    this.devices = [];

    if (authData.length !== 0) {
      for (const i of authData) {
        this.devices.push({
          id: i.id,
          userID: i.userID,
          deviceName: i.deviceName,
          createdAt: i.createdAt,
          updatedAt: i.updatedAt,
        });
      }
    }
  }
}

export default DevicesDto;
