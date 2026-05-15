import { QrCode } from "lucide-react";

interface TicketCardProps {
  time: string;
  origin: string;
  destination: string;
  qrCode: string;
}

export function TicketCard({ time, origin, destination, qrCode }: TicketCardProps) {
  return (
    <div className="w-full flex items-center gap-3 py-3 border-b border-gray-100 last:border-none">
      <div className="w-1 h-10 bg-(--color-primary) rounded-full" />

      <div className="flex-1 flex items-center gap-3">
        <span className="text-(--color-primary) font-bold text-sm">{time}</span>
        <span className="text-(--color-primary) text-sm">
          {origin} → {destination}
        </span>
      </div>

      <button
        // eslint-disable-next-line no-console
        onClick={() => console.log(qrCode)}
        className="flex flex-col items-center gap-0.5 text-(--color-primary) cursor-pointer"
      >
        <QrCode className="w-6 h-6" />
        <span className="text-xs">Abrir</span>
      </button>
    </div>
  );
}
