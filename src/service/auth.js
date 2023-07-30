import { axiosClient } from "../util/axiosClient";

export function signUp(email, password) {
  return axiosClient.post("auth/signup", { email, password });
}

export function signIn(email, password) {
  return axiosClient.post("auth/signin", { email, password });
}
