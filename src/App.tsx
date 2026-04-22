import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "./pages/Register/Register";
import { Login } from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
