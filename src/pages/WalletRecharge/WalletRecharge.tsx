import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";

export function WalletRecharge() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | undefined>(undefined);

  const isValidAmount = amount !== undefined && amount > 0;

  function handlePayWithPix() {
    if (!isValidAmount) return;

    navigate("/app/wallet/recharge/pix", { state: { amount } });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        <div className="px-6 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-2xl font-bold text-(--color-primary) text-center">
              Quanto deseja depositar?
            </h1>
            <p className="text-sm text-(--color-primary) text-center">
              O saldo será adicionado à sua carteira
            </p>
          </div>

          <NumericFormat
            value={amount ?? ""}
            onValueChange={(values) => setAmount(values.floatValue)}
            prefix="R$ "
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            inputMode="decimal"
            placeholder="R$ 0,00"
            aria-label="Valor do depósito"
            className="w-full h-12 bg-white rounded-lg px-4 text-sm text-(--color-primary) outline-none border border-gray-200"
          />

          <button
            type="button"
            onClick={handlePayWithPix}
            disabled={!isValidAmount}
            className="self-center bg-(--color-primary) text-white font-bold px-10 py-3 rounded-xl cursor-pointer active:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Pagar com Pix
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
