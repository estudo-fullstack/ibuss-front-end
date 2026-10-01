import { QRCodeSVG } from "qrcode.react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { getTicketById } from "../../api/ticket.api";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const inactiveMessages: Record<string, string> = {
  USED: "Esta passagem já foi utilizada.",
  CANCELED: "Esta passagem foi cancelada.",
  EXPIRED: "Esta passagem expirou.",
};

export function QRCodeTicket() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const {
    data: ticket,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getTicketById(ticketId!),
    enabled: !!ticketId,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        {isLoading ? (
          <p className="text-center text-sm text-(--color-primary)">Carregando...</p>
        ) : isError || !ticket ? (
          <div className="px-6 flex flex-col gap-6">
            <div className="w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-bold text-(--color-primary) text-center">
                Passagem não encontrada
              </p>
              <p className="text-sm text-(--color-primary) text-center">
                Não foi possível carregar esta passagem. Tente novamente mais tarde.
              </p>
            </div>
            <button
              onClick={() => navigate("/app/home")}
              className="text-sm font-semibold text-(--color-primary) underline cursor-pointer self-center"
            >
              ← Voltar para minhas passagens
            </button>
          </div>
        ) : ticket.status !== "ACTIVE" ? (
          <div className="px-6 flex flex-col gap-6">
            <div className="w-full bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-4">
              <p className="text-lg font-bold text-(--color-primary) text-center">
                QR Code indisponível
              </p>
              <p className="text-sm text-(--color-primary) text-center">
                {inactiveMessages[ticket.status]}
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
          <div className="px-6 flex flex-col gap-10">
            <div className="w-full bg-white rounded-lg shadow p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-(--color-primary)">
                {ticket.route.origin} → {ticket.route.destination}
              </span>
              <span className="text-sm font-semibold text-(--color-primary)">
                {currencyFormatter.format(Number(ticket.purchasePrice))}
              </span>
            </div>

            <div className="w-full bg-white rounded-lg shadow p-6 flex justify-center">
              <QRCodeSVG value={ticket.id} size={250} />
            </div>

            <p className="text-sm text-(--color-primary) text-center leading-relaxed">
              Aproxime o código do leitor
              <br />
              para validar sua passagem
            </p>
            <button
              onClick={() => navigate("/app/home")}
              className="text-sm font-semibold text-(--color-primary) underline cursor-pointer self-center"
            >
              ← Voltar para minhas passagens
            </button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
