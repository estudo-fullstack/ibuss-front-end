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
  id: string;
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

export type AuthResponseType = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type TicketStatusType = 'ACTIVE' | 'USED' | 'CANCELLED' | 'EXPIRED';

export type TicketApiResponseType = {
  id: string;
  purchasePrice: number;
  status: TicketStatusType;
  purchaseAt: string;
  usedAt: string | null;
  route: {
    routeNumber: string;
    origin: string;
    destination: string;
    price: number;
  };
};
