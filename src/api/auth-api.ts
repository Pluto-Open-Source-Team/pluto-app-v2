import axios from 'axios';

class AuthApi {
  async userInfo(accessToken): Promise<UserProps> {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
