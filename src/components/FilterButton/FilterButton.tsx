import { useEffect, useRef, useState } from "react";

import type { TicketStatusType } from "../../api/types";

const filterOptions: { value: TicketStatusType; label: string }[] = [
  { value: "ACTIVE", label: "Ativos" },
  { value: "USED", label: "Usados" },
  { value: "CANCELED", label: "Cancelados" },
  { value: "EXPIRED", label: "Expirados" },
];

interface FilterButtonProps {
  selectedStatus?: TicketStatusType;
  onStatusChange?: (status: TicketStatusType) => void;
}

export function FilterButton({
  selectedStatus,
  onStatusChange,
}: FilterButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isControlled = selectedStatus !== undefined && onStatusChange !== undefined;

  const selectedLabel =
    filterOptions.find((option) => option.value === selectedStatus)?.label ?? "Filtros";

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target;

      if (
        containerRef.current &&
        target instanceof Node &&
        !containerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  function handleSelect(status: TicketStatusType) {
    onStatusChange?.(status);
    setIsOpen(false);
  }

  if (!isControlled) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 font-medium bg-white border border-[#E3F2FD] rounded-full cursor-pointer shadow-sm text-sm text-[#0D47A1]">
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
        <svg
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
      </button>
    );
  }

  return (
    <div ref={containerRef} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-2 px-4 py-2 font-medium bg-white border border-[#E3F2FD] rounded-full cursor-pointer shadow-sm text-sm text-[#0D47A1]"
      >
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
        {selectedLabel}
        <svg
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
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-10 mt-2 min-w-44 overflow-hidden rounded-2xl border border-[#E3F2FD] bg-white shadow-lg"
        >
          {filterOptions.map((option) => {
            const isSelected = option.value === selectedStatus;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                onClick={() => handleSelect(option.value)}
                className={`block w-full px-4 py-3 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#E3F2FD] font-semibold text-[#0D47A1]"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
