import avatar01 from "./avatar-01-curto-liso.svg";
import avatar02 from "./avatar-02-afro.svg";
import avatar03 from "./avatar-03-longo-ruivo.svg";
import avatar04 from "./avatar-04-fem-pixie.svg";
import avatar05 from "./avatar-05-coque.svg";
import avatar06 from "./avatar-06-oculos.svg";
import avatar07 from "./avatar-07-bone.svg";
import avatar08 from "./avatar-08-trancas.svg";
import avatar09 from "./avatar-09-ondulado.svg";
import avatar10 from "./avatar-10-careca.svg";
import avatar11 from "./avatar-11-masc-moreno.svg";
import avatar12 from "./avatar-12-fem-morena-cacheada.svg";
import avatar13 from "./avatar-13-fem-loira-longa.svg";
import avatar14 from "./avatar-14-masc-barba.svg";
import avatar15 from "./avatar-15-fem-loira-curta.svg";
import avatar16 from "./avatar-16-masc-moreno-cacheado.svg";
import avatar17 from "./avatar-17-fem-morena-rabo.svg";
import avatar18 from "./avatar-18-fem-grisalha.svg";
import avatar19 from "./avatar-19-fem-branca-liso-preto.svg";
import avatar20 from "./avatar-20-fem-morena-liso.svg";

// The `id` is what travels through the API/JWT — never the image itself.
export const AVATARS = [
  { id: "avatar01", label: "Curto liso", src: avatar01 },
  { id: "avatar02", label: "Afro", src: avatar02 },
  { id: "avatar03", label: "Longo ruivo", src: avatar03 },
  { id: "avatar04", label: "Cabelo bem curto", src: avatar04 },
  { id: "avatar05", label: "Coque", src: avatar05 },
  { id: "avatar06", label: "Óculos", src: avatar06 },
  { id: "avatar07", label: "Boné", src: avatar07 },
  { id: "avatar08", label: "Tranças", src: avatar08 },
  { id: "avatar09", label: "Ondulado", src: avatar09 },
  { id: "avatar10", label: "Careca", src: avatar10 },
  { id: "avatar11", label: "Moreno", src: avatar11 },
  { id: "avatar12", label: "Cacheada", src: avatar12 },
  { id: "avatar13", label: "Loira longa", src: avatar13 },
  { id: "avatar14", label: "Barba", src: avatar14 },
  { id: "avatar15", label: "Loira curta", src: avatar15 },
  { id: "avatar16", label: "Moreno cacheado", src: avatar16 },
  { id: "avatar17", label: "Rabo de cavalo", src: avatar17 },
  { id: "avatar18", label: "Grisalha", src: avatar18 },
  { id: "avatar19", label: "Liso preto", src: avatar19 },
  { id: "avatar20", label: "Morena liso", src: avatar20 },
] as const satisfies ReadonlyArray<{ id: string; label: string; src: string }>;

export type AvatarId = (typeof AVATARS)[number]["id"];

export const DEFAULT_AVATAR_ID: AvatarId = "avatar01";

const avatarMap = new Map(AVATARS.map((a) => [a.id, a]));

// Falls back to DEFAULT_AVATAR_ID when id is null/undefined/invalid.
export function getAvatarSrc(id: AvatarId | null | undefined): string {
  if (!id) return avatarMap.get(DEFAULT_AVATAR_ID)!.src;
  return avatarMap.get(id)?.src ?? avatarMap.get(DEFAULT_AVATAR_ID)!.src;
}

// Use with Zod .refine() to validate IDs coming from the backend.
export function isValidAvatarId(id: unknown): id is AvatarId {
  return typeof id === "string" && avatarMap.has(id as AvatarId);
}

export function getAvatarById(id: AvatarId): (typeof AVATARS)[number] {
  return avatarMap.get(id) ?? avatarMap.get(DEFAULT_AVATAR_ID)!;
}