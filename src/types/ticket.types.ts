export interface Ticket {
  id: string;
  purchasePrice: number;
  status: string;
  purchaseAt: string;
  usedAt: string | null;
  route: {
    routeNumber: string;
    origin: string;
    destination: string;
    price: number;
  };
}