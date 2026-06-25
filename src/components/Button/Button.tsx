import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "danger" | "outline";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  children: ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-(--color-primary) text-white",
  danger: "bg-red-500 text-white",
  outline: "border border-(--color-primary) text-(--color-primary) bg-white",
};

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-2 rounded-full cursor-pointer ${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
