import { QrCode } from "lucide-react";
import type { Ticket } from "../../types/ticket.types";
import { useNavigate } from "react-router-dom";

type TicketCardProps = Ticket;

export function TicketCard({ id, route }: TicketCardProps) {
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-none font-medium text-(--color-primary)">
      <div className="w-1 h-10 bg-(--color-secondary) rounded-full" />

      <div className="flex-1 flex items-center gap-3">
        <span className=" text-sm">
          {route.origin} → {route.destination}
        </span>
      </div>
      <button
        onClick={() => {
          navigate(`/app/ticket/${id}`);
        }}
        className="flex flex-col items-center gap-0.5  cursor-pointer"
      >
        <QrCode className="w-6 h-6 " />
        <span className="text-xs">Abrir</span>
      </button>
    </div>
  );
}
