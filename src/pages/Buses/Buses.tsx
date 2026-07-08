
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";
import { FilterButton } from "../../components/FilterButton/FilterButton";
import { BusCard } from "../../components/BusCard/BusCard";
import { busesMock } from "../../api/bus.mock";

export function Buses() {
  const navigate = useNavigate();

  // Static data for now; will be replaced by GET /buses via TanStack Query.
  const buses = busesMock;

  function handleSelectBus(id: number) {
    navigate(`/app/buses/${id}`);
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
          <div className="w-full bg-white rounded-2xl shadow p-4 flex flex-col gap-2 mx-auto">
            {buses.map((bus) => (
              <BusCard key={bus.id} bus={bus} onSelect={handleSelectBus} />
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}