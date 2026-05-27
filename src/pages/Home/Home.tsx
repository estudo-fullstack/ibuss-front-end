import { useQuery } from "@tanstack/react-query";

import { Navbar } from "../../components/Navbar/Navbar";
import { TicketCard } from "../../components/TicketCard/TicketCard";
import { FilterButton } from "../../components/FilterButton/FilterButton";

import type { Ticket } from "../../types/ticket.types";

import logoBlue from "../../assets/icons/icon-ibuss.svg";

export function Home() {
  const { data: tickets, isLoading } = useQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      // TODO: integrar com API
      return [
        {
          id: "1",
          time: "11:10",
          origin: "Goiânia",
          destination: "Anápolis",
          qrCode: "mock-qr-code-1",
          price: 7.95,
        },
        {
          id: "2",
          time: "20:30",
          origin: "Anápolis",
          destination: "Goiânia",
          qrCode: "mock-qr-code-2",
          price: 9.95,
        },
      ];
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col pt-12 gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <div className="px-6 ">
          <img src={logoBlue} alt="Logo iBuss" className="w-20" />
        </div>

        <h1 className="text-3xl font-extrabold text-(--color-primary) text-center">Minhas passagens</h1>

        <div className="w-full px-6 flex justify-end">
          {" "}
          <FilterButton />
        </div>

        <div className="px-6 ">
          {isLoading ? (
            <p className="text-center text-sm text-(--color-primary)">Carregando...</p>
          ) : tickets && tickets.length > 0 ? (
            <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col mx-auto">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} {...ticket} />
              ))}
              <div className="flex justify-center mt-6">
                <button className="text-sm text-(--color-primary) underline cursor-pointer">
                  Atualizar
                </button>
              </div>
            </div>
          ) : (
            <div className="w-[85%] bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <p className="text-lg font-bold text-(--color-primary) text-center uppercase tracking-wider">
                  ATENÇÃO!
                </p>
              </div>
              <p className="text-base text-(--color-primary) text-center px-4 leading-relaxed">
                Você ainda não possui nenhuma passagem.
              </p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
