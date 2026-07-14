export type PeriodFilterType = "15_DAYS" | "30_DAYS" | "CUSTOM_MONTH";

interface PeriodFilterProps {
  selected: PeriodFilterType;
  selectedMonth: string;
  onPeriodSelect: (period: PeriodFilterType) => void;
  onMonthSelect: (month: string) => void;
}

const periods: { value: PeriodFilterType; label: string }[] = [
  { value: "15_DAYS", label: "15 dias" },
  { value: "30_DAYS", label: "30 dias" },
  { value: "CUSTOM_MONTH", label: "Mês" },
];

export function PeriodFilter({
  selected,
  selectedMonth,
  onPeriodSelect,
  onMonthSelect,
}: PeriodFilterProps) {
  return (
    <div className="flex flex-col gap-1.5 bg-(--color-background) p-1 rounded-2xl shadow-[0_0_10px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-evenly gap-1.5">
        <span className="text-xs font-semibold text-(--color-primary)">Período:</span>
        {periods.map(({ value, label }) => {
          const isActive = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onPeriodSelect(value)}
              className={`rounded-full px-4 py-1 text-xs font-semibold transition-colors ${
                isActive ? "bg-(--color-primary) text-white" : "bg-gray-100 text-(--color-primary)"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {selected === "CUSTOM_MONTH" && (
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => onMonthSelect(e.target.value)}
          className="rounded-lg border border-(--color-secondary) px-2 py-1 text-xs font-medium text-(--color-primary)"
        />
      )}
    </div>
  );
}
