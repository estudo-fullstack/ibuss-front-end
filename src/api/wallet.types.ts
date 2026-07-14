export type TransactionType = "DEPOSIT" | "WITHDRAWAL";

export interface Transaction {
    // TODO(api): confirmar com a Emilly o formato do id das transactions.
  // Assumido como UUID string (padrão do back para movimentação financeira,
  // igual ao UserProfileType.id). Ajustar para number se o back divergir.
  id: string;
  type: TransactionType;
  value: number;
  // ISO 8601 (com offset) — formatado para DD/MM/YY e HH:MM na renderização
  createdAt: string;
}