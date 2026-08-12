import type { TicketStatusType } from "../../api/types";

interface FilterButtonProps {
  selectedStatus?: TicketStatusType;
  onStatusChange?: (status: TicketStatusType) => void;
  filterOptions?: Map<TicketStatusType, string>;
}

const triggerClassName =
  "flex items-center gap-2 px-4 py-2 font-medium bg-white border border-[#E3F2FD] rounded-full cursor-pointer shadow-sm text-sm text-[#0D47A1]";

export function FilterButton({
  selectedStatus,
  onStatusChange,
  filterOptions,
}: FilterButtonProps) {
  const isControlled = selectedStatus !== undefined && onStatusChange !== undefined;

  if (!isControlled) {
    // Fallback para manter compatibilidade com telas que usam o FilterButton apenas como botão visual.

    return (
      <button className={triggerClassName}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filtros
      </button>
    );
  }

  return (
    <div className="relative inline-block">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>

      <select
        value={selectedStatus}
        onChange={(event) => onStatusChange(event.target.value as TicketStatusType)}
        className="appearance-none pl-10 pr-8 py-2 font-medium bg-white border border-[#E3F2FD] rounded-full cursor-pointer shadow-sm text-sm text-[#0D47A1]"
      >
        {Array.from(filterOptions ?? []).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m7 15 5 5 5-5" />
        <path d="m7 9 5-5 5 5" />
      </svg>
    </div>
  );
}
