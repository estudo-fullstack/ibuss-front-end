import type { Bus } from "./bus.types";
/**
 * Static bus data used to simulate the GET /buses response during
 * development. Mirrors the four lines shown in the "Próximas partidas"
 * mockup. Replace with the real API call once the endpoint is wired up.
 */
export const busesMock: Bus[] = [
{
    id: "1",
    routeId: "1",
    routeNumber: "GO-001",
    departureTime: "10:30",
    price: 7.95,
    origin: "Goiânia",
    destination: "Anápolis",
    tripDuration: 60,
  },
  {
    id: "2",
    routeId: "2",
    routeNumber: "GO-002",
    departureTime: "10:45",
    price: 12.45,
    origin: "Goiânia",
    destination: "Inhumas",
    tripDuration: 45,
  },
  {
    id: "3",
    routeId: "3",
    routeNumber: "GO-003",
    departureTime: "10:50",
    price: 7.95,
    origin: "Goiânia",
    destination: "Anápolis",
    tripDuration: 60,
  },
  {
    id: "4",
    routeId: "4",
    routeNumber: "GO-004",
    departureTime: "11:00",
    price: 12.45,
    origin: "Goiânia",
    destination: "Inhumas",
    tripDuration: 45,
  },
];