// import type { Post } from '@/types/Post';
// import type { User } from '@/types/User';
import type { UserLoginRequest } from '@/types/UserLoginRequest';
// import axios from 'axios';

export default {
  async login(credentials: UserLoginRequest) {
    // const { data, status } = await axios.post<UserLoginRespose (data.token=123, status=200, 401 etc.)>(
    //   'some-endpoint/auth/login',
    //   credentials
    // );
    // return { data, status };

    if (credentials.username === 'admin' && credentials.password === 'admin') {
      let resolved = (Promise as any).resolve({
        id: 1,
        role: 'admin',
        username: 'admin',
      });

      return resolved;
    } else if (
      credentials.username === 'user' &&
      credentials.password === 'user'
    ) {
      let resolved = (Promise as any).resolve({
        id: 2,
        role: 'user',
        username: 'user',
      });

      return resolved;
    } else {
      const rejected = (Promise as any).reject(
        new Error('Invalid credentials.')
      );
      return rejected;
    }
  },

  async logout(token: string) {
    // const { status } = await axios.post<UserLogoutRespoonse (status=204 etc.)>(
    //   'some-endpoint/auth/logout',
    //   token
    // );
    // return status;

    let resolved = (Promise as any).resolve({ status: 204 });

    return resolved;
  },
};
