import { useState, useMemo } from "react";
import { CircleDollarSign } from "lucide-react";
import dayjs from "../../services/dayjs";

import { walletBalanceMock, walletTransactionsMock } from "../../api/wallet.mock";
import type { WalletTab } from "../../components/WalletTabs/WalletTabs";
import type { PeriodFilterType } from "../../components/PeriodFilter/PeriodFilter";
import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { TransactionRow } from "../../components/TransactionRow/TransactionRow";
import { WalletTabs } from "../../components/WalletTabs/WalletTabs";
import { PeriodFilter } from "../../components/PeriodFilter/PeriodFilter";

const balanceFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function Wallet() {
  const [activeTab, setActiveTab] = useState<WalletTab>("ALL");
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilterType>("30_DAYS");

  const defaultMonth = dayjs().format("YYYY-MM");
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  function calculateDateRange(period: PeriodFilterType, month: string) {
    const now = dayjs();

    if (period === "15_DAYS") {
      return { start: now.subtract(15, "day"), end: now };
    }

    if (period === "30_DAYS") {
      return { start: now.subtract(30, "day"), end: now };
    }

    const monthDate = dayjs(month, "YYYY-MM");
    return { start: monthDate.startOf("month"), end: monthDate.endOf("month") };
  }

  const filteredTransactions = useMemo(() => {
    const { start, end } = calculateDateRange(selectedPeriod, selectedMonth);

    return walletTransactionsMock
      .filter((t) => activeTab === "ALL" || t.type === activeTab)
      .filter((t) => dayjs(t.createdAt).isBetween(start, end, null, "[]"));
  }, [activeTab, selectedPeriod, selectedMonth]);

  function handleDeposit() {
    // TODO(nav): navegar para /app/wallet/recharge quando a branch
    // feature/wallet-recharge-page (encadeada nesta) definir a rota.
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        <h1 className="text-3xl font-extrabold text-(--color-primary) text-center">
          Minha carteira
        </h1>

        <div className="flex flex-1 min-h-0 flex-col gap-6 overflow-y-auto px-6 pb-24">
          <div className="flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 shadow-sm">
            <div className="flex items-center gap-3">
              <CircleDollarSign className="text-(--color-icons)" size={32} />
              <span className="text-2xl font-extrabold text-(--color-icons)">
                {balanceFormatter.format(walletBalanceMock)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleDeposit}
              className="rounded-xl bg-(--color-primary) px-5 py-2 font-bold text-white"
            >
              Depositar
            </button>
          </div>

          <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
            <PeriodFilter
              selected={selectedPeriod}
              selectedMonth={selectedMonth}
              onPeriodSelect={setSelectedPeriod}
              onMonthSelect={setSelectedMonth}
            />
          </div>

          <div className="rounded-2xl bg-white px-4 py-5 shadow-sm">
            <WalletTabs active={activeTab} onSelect={setActiveTab} />

            <div className="mt-5">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))
              ) : (
                <div className="py-8 text-center text-sm text-gray-400">
                  Nenhuma transação encontrada
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
