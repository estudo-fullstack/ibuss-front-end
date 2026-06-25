export type CreateUserType = {
  name: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};

export type UserProfileType = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  photo?: string;
};

export type UpdateUserType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  photo?: string;
};