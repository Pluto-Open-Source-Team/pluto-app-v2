import axios from 'axios';
import { setupAxiosInterceptors } from '@/api/axiosConfig';

class ChromePolicyApi {
  private axiosInstance = axios.create({
    baseURL: 'https://chromepolicy.googleapis.com/v1/customers/my_customer',
  });

  constructor() {
    setupAxiosInterceptors(this.axiosInstance);
  }

  async resolvePolicies(
    data: ResolvePoliciesRequestBody,
  ): Promise<ResolvePoliciesResponseBody> {
    let requestUrl = '/policies:resolve';

    const response = await this.axiosInstance.post(requestUrl, data);
    return response.data;
  }
}

export const chromePolicyApi = new ChromePolicyApi();
