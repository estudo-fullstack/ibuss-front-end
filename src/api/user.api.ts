import api from "../services/axios";
import type {
  AuthResponseType,
  CreateUserType,
  ForgotPasswordType,
  LoginUserType,
  MessageResponseType,
  ResetPasswordType,
  UpdateUserAvatarType,
  UpdateUserType,
  UserProfileType,
} from "./types";

export async function createUser(data: CreateUserType) {
  const response = await api.post("/auth/register", data);
  return response.data;
}

export async function loginUser(data: LoginUserType): Promise<AuthResponseType> {
  const response = await api.post("/auth/login", data);
  return response.data;
}

export async function forgotPassword(data: ForgotPasswordType): Promise<MessageResponseType> {
  const response = await api.post<MessageResponseType>("/auth/forgot-password", data);
  return response.data;
}

export async function resetPassword(data: ResetPasswordType) {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
}

export async function getUserProfile(): Promise<UserProfileType> {
  const response = await api.get("/users/me");
  return response.data;
}

export async function updateUserProfile(data: UpdateUserType): Promise<UserProfileType> {
  const response = await api.patch("/users/me", data);
  return response.data;
}

export async function updateUserAvatar(data: UpdateUserAvatarType): Promise<UserProfileType> {
  const response = await api.patch("/users/me/avatar", data);
  return response.data;
}

export async function deleteUserAccount(): Promise<void> {
  await api.delete("/users/me");
}
