import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { TicketCheck } from "lucide-react";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { purchaseTicket } from "../../api/ticket.api";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function BusPurchase() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [purchased, setPurchased] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const routeId = searchParams.get("routeId")!;
  const purchasePrice = searchParams.get("purchasePrice");

  const price = purchasePrice ? Number(purchasePrice) : 0;

  const purchaseMutation = useMutation({
    mutationFn: purchaseTicket,
    onMutate: () => {
      setSubmitError(null);
    },
    onSuccess: () => {
      setPurchased(true);
    },
    onError: (error) => {
      if (typeof error.message === "string") {
        setSubmitError(error.message);
        return;
      }
      setSubmitError("Não foi possível realizar a compra. Tente novamente.");
    },
  });

  function handlePurchase() {
    purchaseMutation.mutate({ routeId, purchasePrice: price });
  }
  
  if (!routeId || !purchasePrice) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-97.5 h-screen flex flex-col items-center justify-center gap-4 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
          <p className="text-(--color-primary) font-bold">
            Parâmetros inválidos.
          </p>
          <button
            onClick={() => navigate("/app/buses")}
            className="text-sm text-(--color-primary) underline cursor-pointer"
          >
            Voltar para linhas disponíveis
          </button>
          <div className="absolute bottom-0 left-0 right-0">
            <Navbar />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        {purchased ? (
          <div className="px-6 flex flex-col gap-8">
            <div className="w-full bg-white rounded-2xl shadow p-4 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="w-1 self-stretch rounded-full bg-(--color-secondary)"
              />
              <span className="flex-1 font-semibold text-(--color-primary)">{routeId}</span>
              <span className="text-sm font-semibold text-(--color-primary)">
                {currencyFormatter.format(price)}
              </span>
            </div>

            <div className="w-full bg-white rounded-2xl shadow p-8 flex flex-col items-center gap-4">
              <TicketCheck
                aria-hidden="true"
                className="w-16 h-16 text-green-500"
                strokeWidth={1.0}
              />

              <p className="text-lg font-semibold text-(--color-primary) text-center">
                Compra efetuada com sucesso! Boa viagem!
              </p>
            </div>

            <button
              onClick={() => navigate("/app/home")}
              className="text-sm font-semibold text-(--color-primary) underline cursor-pointer self-center"
            >
              ← Voltar para minhas passagens
            </button>
          </div>
        ) : (
          <div className="px-6 flex flex-col gap-8">
            <div className="w-full bg-white rounded-2xl shadow p-4 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="w-1 self-stretch rounded-full bg-(--color-secondary)"
              />
              <span className="flex-1 font-semibold text-(--color-primary)">{routeId}</span>
              <span className="text-sm font-semibold text-(--color-primary)">
                {currencyFormatter.format(price)}
              </span>
            </div>

            {submitError && (
              <p className="text-sm font-medium text-red-500 text-center px-6">
                {submitError}
              </p>
            )}

            <div className="flex flex-col items-center gap-4">
              <p className="text-sm font-medium text-(--color-primary) text-center px-6">
                Ao clicar em comprar o valor da passagem será debitado de sua
                carteira
              </p>
              <button
                onClick={handlePurchase}
                disabled={purchaseMutation.isPending}
                className="bg-(--color-primary) text-white font-bold px-10 py-3 rounded-xl cursor-pointer active:opacity-80 disabled:opacity-50"
              >
                {purchaseMutation.isPending ? "Comprando..." : "Comprar"}
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
