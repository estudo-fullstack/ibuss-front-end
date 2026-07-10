// src/components/BusCard/BusCard.tsx
import dayjs from "dayjs";
import type { Bus } from "../../api/bus.types";

interface BusCardProps {
  bus: Bus;
  onSelect: (bus: Bus) => void;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function BusCard({ bus, onSelect }: BusCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(bus)}
      className="flex w-full cursor-pointer items-center gap-4 border-b border-gray-100 py-4 text-left transition-opacity last:border-b-0 active:opacity-70"
    >
      <span
        aria-hidden="true"
        className="w-1 self-stretch rounded-full bg-(--color-secondary)"
      />

      <span className="font-medium tabular-nums text-(--color-icons)">
        {dayjs(bus.departureTime).format("HH:mm")}
      </span>

      <span className="flex-1 font-medium text-(--color-primary)">
        {bus.routeNumber}
      </span>

      <span className="text-sm font-semibold text-(--color-primary)">
        {currencyFormatter.format(bus.price)}
      </span>
    </button>
  );
}