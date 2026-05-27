import { QrCode } from "lucide-react";
import type { Ticket } from "../../types/ticket.types";

type TicketCardProps = Omit<Ticket, "id">;

export function TicketCard({ time, origin, destination, qrCode, price }: TicketCardProps) {
  return (
    <div className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-none text-(--color-primary)">
      <div className="w-1 h-10 bg-(--color-primary) rounded-full" />

      <div className="flex-1 flex items-center gap-3">
        <span className=" font-bold text-sm">{time}</span>
        <span className=" text-sm">
          {origin} → {destination}
        </span>
      </div>

      <span className="text-xs font-medium )">R$ {price.toFixed(2).replace(".", ",")}</span>
      <button
        onClick={() => {
          // TODO: navegar para a tela de QR code passando os dados da passagem
        }}
        className="flex flex-col items-center gap-0.5  cursor-pointer"
      >
        <QrCode className="w-6 h-6" />
        <span className="text-xs">Abrir</span>
      </button>
    </div>
  );
}
