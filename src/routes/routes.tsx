import { Route } from "react-router-dom";

import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { ForgotPassword } from "../pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "../pages/ResetPassword/ResetPassword";
import { Home } from "../pages/Home/Home";
import { Profile } from "../pages/Profile/Profile";
import { Buses } from "../pages/Buses/Buses";
import { Wallet } from "../pages/Wallet/Wallet";
import { BusPurchase } from "../pages/BusPurchase/BusPurchase";


export const publicRoutes = (
  <>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
  </>
);

export const privateRoutes = (
  <>
    <Route path="/app/home" element={<Home />} />
    <Route path="/app/buses" element={<Buses />} />
    <Route path="/app/buses/purchase" element={<BusPurchase />} />
    <Route path="/app/wallet" element={<Wallet />} />
    <Route path="/app/profile" element={<Profile />} />
  </>
);