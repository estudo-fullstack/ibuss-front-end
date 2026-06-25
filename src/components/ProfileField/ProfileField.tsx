import type { ReactNode } from "react";

type ProfileFieldProps = {
  label: string;
  value: string;
  isEditing: boolean;
  editContent?: ReactNode;
  helperText?: string;
};

export function ProfileField({
  label,
  value,
  isEditing,
  editContent,
  helperText,
}: ProfileFieldProps) {
  return (
    <div className="flex flex-col gap-1 border-l-4 border-(--color-secondary) pl-3">
      <span className="text-xs text-(--color-icons) font-medium">{label}</span>

      {isEditing && editContent ? (
        editContent
      ) : (
        <span className="text-sm font-semibold text-(--color-primary)">{value}</span>
      )}

      {isEditing && helperText && <span className="text-xs text-gray-400">{helperText}</span>}
    </div>
  );
}
