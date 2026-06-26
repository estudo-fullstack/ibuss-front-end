import { BrowserRouter, Routes } from "react-router-dom";

import { publicRoutes, privateRoutes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {privateRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
