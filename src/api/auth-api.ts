import axios from 'axios';

class AuthApi {
  async tokenInfo(accessToken): Promise<{ email: string }> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://oauth2.googleapis.com/tokeninfo?access_token=${accessToken}`,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch(() => {
          reject(new Error('Something went wrong while getting token info!'));
        });
    });
  }
}

export const authApi = new AuthApi();
