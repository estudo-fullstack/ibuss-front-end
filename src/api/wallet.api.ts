import api from "../services/axios";
import type { TransactionType } from "./wallet.types";

export type WalletBalanceResponseType = {
  balance: number;
};

export type DepositWalletType = {
  amount: number;
};

export type DepositWalletResponseType = {
  transactionAmount: string;
  transactionType: TransactionType;
};

export async function getWalletBalance(): Promise<WalletBalanceResponseType> {
  const response = await api.get<WalletBalanceResponseType>("/wallet/balance");

  return response.data;
}

export async function depositWallet(
  data: DepositWalletType,
): Promise<DepositWalletResponseType> {
  const response = await api.post<DepositWalletResponseType>("/wallet/deposit", data);

  return response.data;
}
