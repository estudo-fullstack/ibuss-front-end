import api from "../services/axios";
import type { BusApiResponseType } from "./types";

export async function getBuses(): Promise<BusApiResponseType[]> {
  const response = await api.get<BusApiResponseType[]>("/bus");
  return response.data;
}
