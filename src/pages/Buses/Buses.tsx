import { Header } from "../../components/Header/Header";
import { Navbar } from "../../components/Navbar/Navbar";

export function Buses() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-97.5 h-screen flex flex-col gap-8 bg-(--color-background) shadow-[0_0_40px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden relative">
        <Header />

        <h1 className="text-3xl font-extrabold text-(--color-primary) text-center">
          Linhas disponíveis
        </h1>

        <div className="px-6 pb-24">{/* TODO: lista de linhas de ônibus (próxima etapa) */}</div>

        <div className="absolute bottom-0 left-0 right-0">
          <Navbar />
        </div>
      </div>
    </div>
  );
}
