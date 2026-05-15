import { useQuery } from "@tanstack/react-query";

import { Navbar } from "../../components/Navbar/Navbar";
import { TicketCard } from "../../components/TicketCard/TicketCard";
import { FilterButton } from "../../components/FilterButton/FilterButton";

import logoBlue from "../../assets/icons/icon-ibuss.svg";

interface Ticket {
  id: string;
  time: string;
  origin: string;
  destination: string;
  qrCode: string;
}

export function Home() {
  const { data: tickets, isLoading } = useQuery<Ticket[]>({
    queryKey: ["tickets"],
    queryFn: async () => {
      // TODO: integrar com API
      return [];
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col pt-12 gap-4 bg-[#E3F2FD] shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <div className="px-6 mb-10">
          <img src={logoBlue} alt="Logo iBuss" className="w-20" />
        </div>

        <h1 className="text-3xl font-extrabold text-[#0D47A1] text-center mb-8">
          Minhas passagens
        </h1>

        <div className="w-full px-12.5 flex justify-end">
          <div className="w-2/3 flex justify-end">
            {" "}
            <FilterButton />
          </div>
        </div>

        <div className="grow flex items-start justify-center px-6">
          {isLoading ? (
            <p className="text-center text-sm text-[#0D47A1]">Carregando...</p>
          ) : tickets && tickets.length > 0 ? (
            <div className="w-full">
              {tickets.map((ticket) => (
                <TicketCard key={ticket.id} {...ticket} />
              ))}
              <div className="flex justify-center mt-6">
                <button className="text-sm text-[#0D47A1] underline cursor-pointer">
                  Atualizar
                </button>
              </div>
            </div>
          ) : (
            <div className="w-[85%] bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <p className="text-lg font-bold text-[#0D47A1] text-center uppercase tracking-wider">
                  ATENÇÃO!
                </p>
              </div>
              <p className="text-base text-[#0D47A1] text-center px-4 leading-relaxed">
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
