import api from "../services/axios";
import type { CreateUserType, LoginUserType, UserProfileType, UpdateUserType } from "./types";

export async function createUser(data: CreateUserType) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginUserType) {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function getUserProfile(): Promise<UserProfileType> {
  const response = await api.get("/users/me");
  return response.data;
}

export async function updateUserProfile(data: UpdateUserType): Promise<UserProfileType> {
  const response = await api.put("/users/me", data);
  return response.data;
}

export async function deleteUserAccount(): Promise<void> {
  await api.delete("/users/me");
}
