import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QRCodeSVG } from "qrcode.react";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { depositWallet } from "../../api/wallet.api";

// Código Pix fictício: o app ainda não tem integração real com pagamentos.
const MOCK_PIX_CODE_PREFIX = "00020126580014BR.GOV.BCB.PIX0136ibuss-mock-pix-key";

type WalletPixLocationState = {
  amount?: number;
};

export function WalletPix() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const amount = (location.state as WalletPixLocationState | null)?.amount;
  const pixCode = `${MOCK_PIX_CODE_PREFIX}5204000053039865406${amount?.toFixed(2)}5802BR`;

  const depositMutation = useMutation({
    mutationFn: depositWallet,
    onMutate: () => {
      setSubmitError(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["walletBalance"] });
      navigate("/app/wallet");
    },
    onError: (error) => {
      if (typeof error.message === "string") {
        setSubmitError(error.message);
        return;
      }
      setSubmitError("Não foi possível confirmar o depósito. Tente novamente.");
    },
  });

  if (!amount) {
    return <Navigate to="/app/wallet/recharge" replace />;
  }

  async function handleCopyCode() {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setSubmitError("Não foi possível copiar o código.");
    }
  }

  function handleConfirmPayment() {
    depositMutation.mutate({ amount: amount! });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        <div className="flex-1 overflow-y-auto px-6 pb-24 flex flex-col gap-8">
          <h1 className="text-2xl font-bold text-(--color-primary) text-center">
            Pague com o código
          </h1>

          <div className="w-full bg-white rounded-lg shadow p-6 flex justify-center">
            <QRCodeSVG value={pixCode} size={250} />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={handleCopyCode}
              className="bg-(--color-primary) text-white font-bold px-8 py-3 rounded-xl cursor-pointer active:opacity-80"
            >
              {copied ? "Código copiado!" : "Copiar código"}
            </button>

            <p className="text-sm text-(--color-primary) text-center leading-relaxed">
              O saldo será adicionado à sua carteira
              <br />
              após a confirmação do pagamento
            </p>

            {submitError && (
              <p className="text-sm font-medium text-red-500 text-center">{submitError}</p>
            )}

            <button
              type="button"
              onClick={handleConfirmPayment}
              disabled={depositMutation.isPending}
              className="border border-(--color-primary) text-(--color-primary) bg-white font-bold px-8 py-3 rounded-xl cursor-pointer active:opacity-80 disabled:opacity-50"
            >
              {depositMutation.isPending ? "Confirmando..." : "Já paguei"}
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
