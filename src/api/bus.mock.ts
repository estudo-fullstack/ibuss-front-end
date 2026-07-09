// src/api/bus.mock.ts

import type { Bus } from "./bus.types";

/**
 * Static bus data used to simulate the GET /buses response during
 * development. Mirrors the four lines shown in the "Próximas partidas"
 * mockup. Replace with the real API call once the endpoint is wired up.
 */
export const busesMock: Bus[] = [
  {
    id: 1,
    line: "Goiânia → Anápolis",
    departureTime: "10:30",
    price: 7.95,
  },
  {
    id: 2,
    line: "Goiânia → Inhumas",
    departureTime: "10:45",
    price: 12.45,
  },
  {
    id: 3,
    line: "Goiânia → Anápolis",
    departureTime: "10:50",
    price: 7.95,
  },
  {
    id: 4,
    line: "Goiânia → Inhumas",
    departureTime: "11:00",
    price: 12.45,
  },
];