import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { getRoutes } from "../../api/bus.api";
import { DESTINATION_CITIES, ORIGIN_CITIES } from "../../api/cities";
import type { RouteApiResponseType } from "../../api/types";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const selectClassName =
  "w-full h-12 bg-white rounded-lg px-4 text-sm text-(--color-primary) outline-none border border-gray-200 cursor-pointer";

export function Buses() {
  const navigate = useNavigate();

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedRoute, setSelectedRoute] = useState<RouteApiResponseType | null>(null);

  const hasBothCities = origin !== "" && destination !== "";

  const {
    data: routes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["routes", origin, destination],
    queryFn: () => getRoutes({ origin, destination }),
    enabled: hasBothCities,
  });

  function handleOriginChange(value: string) {
    setOrigin(value);
    setSelectedRoute(null);
  }

  function handleDestinationChange(value: string) {
    setDestination(value);
    setSelectedRoute(null);
  }

  function handleBuyTicket(route: RouteApiResponseType) {
    navigate(`/app/buses/purchase?routeId=${route.id}&purchasePrice=${Number(route.price)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        <h1 className="text-3xl font-extrabold text-(--color-primary) text-center">
          Compre sua passagem
        </h1>

        <div className="flex-1 min-h-0 overflow-y-auto px-6 pb-24 flex flex-col gap-6">
          <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-sm font-medium text-(--color-primary)">
              Escolha a cidade de origem:
              <select
                value={origin}
                onChange={(event) => handleOriginChange(event.target.value)}
                className={selectClassName}
              >
                <option value="">Cidade</option>
                {ORIGIN_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-(--color-primary)">
              Escolha a cidade de destino:
              <select
                value={destination}
                onChange={(event) => handleDestinationChange(event.target.value)}
                className={selectClassName}
              >
                <option value="">Cidade</option>
                {DESTINATION_CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {!hasBothCities ? (
            <p className="text-center text-sm text-(--color-primary)">
              Escolha a origem e o destino para ver as opções.
            </p>
          ) : isLoading ? (
            <p className="text-center text-sm text-(--color-primary)">Carregando...</p>
          ) : isError ? (
            <p className="text-center text-sm font-medium text-red-500">
              Não foi possível carregar as opções. Tente novamente.
            </p>
          ) : !routes || routes.length === 0 ? (
            <p className="text-center text-sm text-(--color-primary)">
              Nenhuma opção encontrada para esse trajeto.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-(--color-primary)">Escolha uma opção:</p>

              <div className="w-full bg-white rounded-2xl shadow p-2 flex flex-col">
                <div className="grid grid-cols-[1.3fr_1fr_1fr_auto] gap-2 px-2 py-2 text-xs font-semibold text-gray-500">
                  <span>Empresa</span>
                  <span>Origem</span>
                  <span>Destino</span>
                  <span className="text-right">Preço</span>
                </div>

                {routes.map((route) => {
                  const isSelected = selectedRoute?.id === route.id;

                  return (
                    <button
                      key={route.id}
                      type="button"
                      onClick={() => setSelectedRoute(route)}
                      aria-pressed={isSelected}
                      className={`grid grid-cols-[1.3fr_1fr_1fr_auto] items-center gap-2 rounded-lg border-t border-gray-100 px-2 py-3 text-left text-xs text-(--color-primary) cursor-pointer transition-colors ${
                        isSelected ? "bg-(--color-secondary)/40" : "hover:bg-(--color-background)"
                      }`}
                    >
                      <span className="font-semibold break-words">{route.company.name}</span>
                      <span className="break-words">{route.origin}</span>
                      <span className="break-words">{route.destination}</span>
                      <span className="text-right font-semibold whitespace-nowrap">
                        {currencyFormatter.format(Number(route.price))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {selectedRoute && (
            <div className="w-full bg-white rounded-2xl shadow p-5 flex flex-col gap-4 text-sm text-(--color-primary)">
              <p className="text-center font-bold">
                {selectedRoute.routeNumber} · {selectedRoute.origin} → {selectedRoute.destination}
              </p>

              <div className="flex flex-col gap-1 border-t border-gray-100 pt-3">
                <span className="text-xs font-semibold text-gray-500">Local de embarque</span>
                <span>{selectedRoute.departureLocation}</span>
              </div>

              <div className="flex flex-col gap-1 border-t border-gray-100 pt-3">
                <span className="text-xs font-semibold text-gray-500">Local de desembarque</span>
                <span>{selectedRoute.arrivalLocation}</span>
              </div>

              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-xs font-semibold text-gray-500">Preço</span>
                <span className="text-base font-bold">
                  {currencyFormatter.format(Number(selectedRoute.price))}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleBuyTicket(selectedRoute)}
                className="self-center bg-(--color-primary) text-white font-bold px-10 py-3 rounded-xl cursor-pointer active:opacity-80"
              >
                Comprar passagem
              </button>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
