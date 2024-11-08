import type { UserLogin, UserRegister } from "../types/user";
import api from "./config";

export const userAPI = {
  login: (data: UserLogin) => api.post("/login", data),
  register: (data: UserRegister) => api.post("/register", data),
};
