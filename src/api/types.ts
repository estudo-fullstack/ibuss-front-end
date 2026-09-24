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

export type ForgotPasswordType = {
  email: string;
};

export type MessageResponseType = {
  message: string;
};

export type ResetPasswordType = {
  id: string;
  token: string;
  password: string;
};

export type UserProfileType = {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phoneNumber: string;
  avatarId: string | null;
};

export type UpdateUserType = {
  name?: string;
  email?: string;
  phoneNumber?: string;
  avatarId?: string;
};

export type UpdateUserAvatarType = {
  avatarId: string;
};

export type AuthResponseType = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

export type TicketStatusType = "ACTIVE" | "USED" | "CANCELED" | "EXPIRED";

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

export type TicketDetailsApiResponseType = {
  id: string;
  purchasePrice: number;
  status: TicketStatusType;
  purchaseAt: string;
  usedAt: string | null;
  expiresAt: string;
  route: {
    routeNumber: string;
    origin: string;
    destination: string;
    departureLocation: string;
    arrivalLocation: string;
  };
};

export type TicketPurchaseRequestType = {
  routeId: string;
  purchasePrice: number;
};

export type TicketPurchaseResponseType = {
  ticketToken: string;
  ticket: {
    transactionAmount: number;
    ticket: {
      id: string;
      status: TicketStatusType;
      expiresAt: string;
      route: {
        origin: string;
        destination: string;
      };
    };
  };
};

export type BusApiResponseType = {
  id: string;
  dayOfWeek: number;
  departureTime: string;
  routeId: string;
  route: {
    routeNumber: string;
    origin: string;
    destination: string;
    tripDuration: number;
    price: number;
  };
};
