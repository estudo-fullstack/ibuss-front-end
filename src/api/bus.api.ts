import api from "../services/axios";
import type { RouteApiResponseType, RouteSearchParamsType } from "./types";

export async function getRoutes(params: RouteSearchParamsType): Promise<RouteApiResponseType[]> {
  const response = await api.get<RouteApiResponseType[]>("/list-routes", { params });
  return response.data;
}
