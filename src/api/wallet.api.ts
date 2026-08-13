import api from "../services/axios";

export type WalletBalanceResponseType = {
  balance: number;
};

export async function getWalletBalance(): Promise<WalletBalanceResponseType> {
  const response = await api.get<WalletBalanceResponseType>("/wallet/balance");
  
  return response.data;
}
