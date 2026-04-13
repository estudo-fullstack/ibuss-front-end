import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputProps<
  TFieldValues extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<TFieldValues>;
  register?: UseFormRegister<TFieldValues>;
  icon?: React.ElementType;
  error?: string;
}

export function Input<TFieldValues extends FieldValues>({
  name,
  register,
  icon: Icon,
  error,
  ...rest
}: InputProps<TFieldValues>) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="relative flex items-center">
        {Icon && <Icon className="absolute left-3 w-5 h-5 text-gray-400" />}

        <input
          {...(register ? register(name) : {})}
          name={name}
          className={`w-full h-12 bg-white rounded-lg pl-10 pr-4 text-sm outline-none border ${
            error ? "border-red-500" : "border-gray-200"
          }`}
          {...rest}
        />
      </div>
      {error && <span className="text-red-500 text-xs pl-1">{error}</span>}
    </div>
  );
}
