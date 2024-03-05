import axios from 'axios';
import { setupAxiosInterceptors } from '@/api/axiosConfig';

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
}

export const directoryApi = new DirectoryApi();
