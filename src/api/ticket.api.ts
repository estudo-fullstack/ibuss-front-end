import api from "../services/axios";
import type {
  TicketApiResponseType,
  TicketPurchaseRequestType,
  TicketPurchaseResponseType,
  TicketDetailsApiResponseType,
  TicketStatusType,
} from "./types";

export async function getTickets(
  status: TicketStatusType,
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

export async function getTicketById(
  ticketId: string,
): Promise<TicketDetailsApiResponseType> {
  const response = await api.get<TicketDetailsApiResponseType>(
    `/ticket/${ticketId}`,
  );
  return response.data;
}
