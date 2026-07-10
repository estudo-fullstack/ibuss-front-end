export interface Bus {
  id: string;
  routeId: string;
  routeNumber: string;
  departureTime: string;
  price: number;
  origin: string;
  destination: string;
  tripDuration: number;
}