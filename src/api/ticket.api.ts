import api from "../services/axios";
import type { TicketApiResponseType, TicketStatusType } from "./types";

export async function getTickets(
  status: TicketStatusType = "ACTIVE",
): Promise<TicketApiResponseType[]> {
  const response = await api.get<TicketApiResponseType[]>("/ticket", {
    params: { status },
  });
  return response.data;
}
