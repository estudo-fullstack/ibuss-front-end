import api from "../services/axios.ts";
import type { CreateUserType } from "./types.ts";

export async function createUser(data: CreateUserType) {
  const response = await api.post("/api/auth/register", data);
  return response.data;
}
