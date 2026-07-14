export type WalletTab = "ALL" | "DEPOSIT" | "WITHDRAWAL";

interface WalletTabsProps {
  active: WalletTab;
  onSelect: (tab: WalletTab) => void;
}

const tabs: { value: WalletTab; label: string }[] = [
  { value: "ALL", label: "Extrato" },
  { value: "DEPOSIT", label: "Recargas" },
  { value: "WITHDRAWAL", label: "Compras" },
];

export function WalletTabs({ active, onSelect }: WalletTabsProps) {
  return (
    <div className="flex items-center gap-1 rounded-full bg-(--color-background) p-1">
      {tabs.map(({ value, label }) => {
        const isActive = active === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onSelect(value)}
            className={`flex-1 rounded-full px-3 py-2 text-sm font-bold transition-colors ${
              isActive ? "bg-(--color-primary) text-white shadow-sm" : "text-(--color-primary)"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
