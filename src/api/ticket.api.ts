import api from "../services/axios";
import type {
  TicketApiResponseType,
  TicketPurchaseRequestType,
  TicketPurchaseResponseType,
  TicketStatusType,
} from "./types";

export async function getTickets(
  status: TicketStatusType = "ACTIVE",
): Promise<TicketApiResponseType[]> {
  const response = await api.get<TicketApiResponseType[]>("/ticket", {
    params: { status },
  });
  return response.data;
}

export async function purchaseTicket(
  data: TicketPurchaseRequestType,
): Promise<TicketPurchaseResponseType> {
  const response = await api.post<TicketPurchaseResponseType>(
    "/ticket/purchase",
    data,
  );
  return response.data;
}
