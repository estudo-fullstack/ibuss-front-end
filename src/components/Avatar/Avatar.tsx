import { getAvatarSrc } from "../../assets/avatars";
import type { AvatarId } from "../../assets/avatars";

type AvatarProps = {
  avatarId: AvatarId | null | undefined;
  size?: number;
  alt?: string;
  className?: string;
};

export function Avatar({
  avatarId,
  size = 64,
  alt = "Avatar do usuário",
  className,
}: AvatarProps) {
  return (
    <img
      src={getAvatarSrc(avatarId)}
      width={size}
      height={size}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
}