import type { Transaction } from "../../api/wallet.types";

const valueFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const { type, value } = transaction;
  const isDeposit = type === "DEPOSIT";
  const label = isDeposit ? "Recarga" : "Compra";

  return (
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0">
      <span className="text-sm font-semibold text-gray-600">{label}</span>

      <span className={`text-lg font-bold ${isDeposit ? "text-green-600" : "text-red-500"}`}>
        {valueFormatter.format(value)}
      </span>
    </div>
  );
}
