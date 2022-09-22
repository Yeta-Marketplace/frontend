import axios, {AxiosError} from 'axios';
import { apiUrl } from '../env';
import { IUserProfile, IUserProfileUpdate, IUserProfileCreate, IUserProfileCreateOpen } from '../interfaces/user';
import { IYardSaleProfile } from '../interfaces/yardsale';

function authHeaders(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

// TODO: maybe redesign as a class to abstract out api.Url stuff. Axios.create https://www.youtube.com/watch?v=12l6lkW6JhE
export const api = {
    async logInGetToken(username: string, password: string) {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
  
      return axios.post(`${apiUrl}/v1/login/access-token`, params)
                  .then( response => response.data.access_token )
                  .catch((err: AxiosError) => { return null; } // TODO: Currently if errors, prints to console log. Not ideal.
      );
    },
    async getMe(token: string) {
      return axios.get<IUserProfile>(`${apiUrl}/v1/users/me`, authHeaders(token));
    },
    async updateMe(token: string, data: IUserProfileUpdate) {
      return axios.put<IUserProfile>(`${apiUrl}/v1/users/me`, data, authHeaders(token));
    },
    async getUsers(token: string) {
      return axios.get<IUserProfile[]>(`${apiUrl}/v1/users/`, authHeaders(token));
    },
    async updateUser(token: string, userId: number, data: IUserProfileUpdate) {
      return axios.put(`${apiUrl}/v1/users/${userId}`, data, authHeaders(token));
    },
    async createUser(token: string, data: IUserProfileCreate) {
      return axios.post(`${apiUrl}/v1/users/`, data, authHeaders(token));
    },
    async passwordRecovery(email: string) {
      return axios.post(`${apiUrl}/v1/password-recovery/${email}`);
    },
    async resetPassword(password: string, token: string) {
      return axios.post(`${apiUrl}/v1/reset-password/`, {
        new_password: password,
        token,
      });
    },

    // Public Methods
    async createUserOpen(data: IUserProfileCreateOpen) {
      return axios.post<IUserProfile>(`${apiUrl}/v1/users/open`, data);
    },

    // =========================== Yard Sales ============================
    async getYardSales({skip = 0, limit = 100}) {
      return axios.get<IYardSaleProfile[]>(`${apiUrl}/v1/yardsales/`, {data: {skip: skip, limit: limit}});
    },
  };
  