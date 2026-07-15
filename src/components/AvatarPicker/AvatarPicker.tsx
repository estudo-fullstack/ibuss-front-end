import { AVATARS, type AvatarId } from "../../assets/avatars";
import { Avatar } from "../Avatar/Avatar";

type AvatarPickerProps = {
  selectedId: AvatarId | null | undefined;
  onSelect: (id: AvatarId) => void;
};

export function AvatarPicker({ selectedId, onSelect }: AvatarPickerProps) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {AVATARS.map((avatar) => (
        <button
          key={avatar.id}
          type="button"
          onClick={() => onSelect(avatar.id)}
          aria-label={`Selecionar ${avatar.label}`}
          aria-pressed={selectedId === avatar.id}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-all ${
            selectedId === avatar.id
              ? "bg-(--color-secondary) ring-2 ring-(--color-primary)"
              : "bg-(--color-background) hover:bg-(--color-secondary)"
          }`}
        >
          <Avatar avatarId={avatar.id} size={56} alt="" />
          <span className="text-[10px] font-medium text-(--color-primary) text-center leading-tight">
            {avatar.label}
          </span>
        </button>
      ))}
    </div>
  );
}