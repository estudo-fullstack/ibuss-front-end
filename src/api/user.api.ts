import api from "../services/axios.ts";
import type { CreateUserType, LoginUserType } from "./types.ts";

export async function createUser(data: CreateUserType) {
  const response = await api.post("/api/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginUserType) {
  const response = await api.post("/api/auth/login", data);
  return response.data;
}
