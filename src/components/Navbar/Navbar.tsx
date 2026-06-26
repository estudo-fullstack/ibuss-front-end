import { NavLink } from "react-router-dom";
import { Home, BusFront, Wallet, User } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-97.5 h-20 bg-white flex items-center justify-around px-8 shadow-md rounded-t-3xl">
      <NavLink
        to="/app/home"
        className={({ isActive }) => (isActive ? "text-(--color-primary)" : "text-gray-400")}
      >
        <Home className="w-8 h-8" />
      </NavLink>

      <NavLink
        to="/app/buses"
        className={({ isActive }) => (isActive ? "text-(--color-primary)" : "text-gray-400")}
      >
        <BusFront className="w-8 h-8" />
      </NavLink>

      <NavLink
        to="/app/wallet"
        className={({ isActive }) => (isActive ? "text-(--color-primary)" : "text-gray-400")}
      >
        <Wallet className="w-8 h-8" />
      </NavLink>

      <NavLink
        to="/app/profile"
        className={({ isActive }) => (isActive ? "text-(--color-primary)" : "text-gray-400")}
      >
        <User className="w-8 h-8" />
      </NavLink>
    </nav>
  );
}