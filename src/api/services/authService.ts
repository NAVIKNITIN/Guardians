import { axiosInstance } from "../axiosInstance";

type LoginRequestBody = {
  username: string;
  password: string;
};

/**
 * Admin login; caller should invoke `login()` from `@/src/utils/auth` on success.
 */
export function login(credentials: LoginRequestBody) {
  return axiosInstance
    .post<unknown>("/users/login", credentials)
    .then((response) => response.data);
}
