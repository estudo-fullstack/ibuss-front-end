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
