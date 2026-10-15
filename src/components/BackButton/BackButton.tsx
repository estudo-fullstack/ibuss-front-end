import { useNavigate } from "react-router-dom";

type BackButtonProps = {
  to: string;
  label: string;
};

export function BackButton({ to, label }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className="text-sm font-semibold text-(--color-primary) underline cursor-pointer self-center"
    >
      ← {label}
    </button>
  );
}