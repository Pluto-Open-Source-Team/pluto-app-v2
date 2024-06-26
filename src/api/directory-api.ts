import axios from 'axios';
import { setupAxiosInterceptors } from '@/api/axiosConfig';
import { OrgUnitsResponseProps } from '@/types/orgUnits';
import { chromeOsDevicesResponseProps } from '@/types/chromeOsDevices';
import { googleListUsersResponseProps } from '@/types/user';

class DirectoryApi {
  private axiosInstance = axios.create({
    baseURL:
      'https://admin.googleapis.com/admin/directory/v1/customer/my_customer',
  });

  constructor() {
    setupAxiosInterceptors(this.axiosInstance);
  }

  /**
   * TODO: instead of returning all, we return immediate children of a specific OU
   */
  async listOrganizationalUnits(): Promise<OrgUnitsResponseProps> {
    let requestUrl = '/orgunits?type=ALL_INCLUDING_PARENT';

    const response = await this.axiosInstance.get(requestUrl);
    return response.data;
  }

  async listChromeOsDevicesByOrgUnitId(
    orgUnitId: string,
  ): Promise<chromeOsDevicesResponseProps> {
    let requestUrl = `/devices/chromeos?projection=BASIC&orgUnitPath=${orgUnitId}`;

    const response = await this.axiosInstance.get(requestUrl);
    return response.data;
  }

  async listGoogleUsersByOrgUnitPath(
    orgUnitPath: string,
  ): Promise<googleListUsersResponseProps> {
    let requestUrl = `/users?query=orgUnitPath='${orgUnitPath}'&viewType=admin_view&projection=BASIC&customer=my_customer`;

    const response = await this.axiosInstance.get(requestUrl, {
      baseURL: 'https://admin.googleapis.com/admin/directory/v1',
    });
    return response.data;
  }
}

export const directoryApi = new DirectoryApi();
