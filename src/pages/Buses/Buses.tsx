
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { FilterButton } from "../../components/FilterButton/FilterButton";
import { BusCard } from "../../components/BusCard/BusCard";
import { getBuses } from "../../api/bus.api";
import { busesMock } from "../../api/bus.mock";
import type { Bus } from "../../api/bus.types";
import type { BusApiResponseType } from "../../api/types";

function mapBusApiToBus(item: BusApiResponseType): Bus {
  return {
    id: item.id,
    routeId: item.routeId,
    routeNumber: item.route.routeNumber,
    departureTime: item.departureTime,
    price: item.route.price,
    origin: item.route.origin,
    destination: item.route.destination,
    tripDuration: item.route.tripDuration,
  };
}

export function Buses() {
  const navigate = useNavigate();

  const { data: buses, isLoading, isError } = useQuery<BusApiResponseType[]>({
    queryKey: ["buses"],
    queryFn: getBuses,
  });

  const mappedBuses = isError
    ? busesMock
    : buses?.map(mapBusApiToBus) ?? [];

  function handleSelectBus(bus: Bus) {
    navigate(
      `/app/buses/purchase?routeId=${bus.routeId}&purchasePrice=${bus.price}`,
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        <h1 className="text-3xl font-extrabold text-(--color-primary) text-center">
          Próximas partidas
        </h1>

        <div className="w-full px-6 flex justify-end">
          <FilterButton />
        </div>

        <div className="px-6 pb-24">
          {isLoading ? (
            <p className="text-center text-sm text-(--color-primary)">
              Carregando...
            </p>
          ) : (
            <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col gap-2 mx-auto">
              {mappedBuses.map((bus) => (
                <BusCard key={bus.id} bus={bus} onSelect={handleSelectBus} />
              ))}
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
