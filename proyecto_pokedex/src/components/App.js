import Home from "./pages/home";
import Pokemones from "./pages/pokemones";
import Juegos from "./pages/juegos";
import VerDetalles from "./pages/verDetalles";
import Paises from "./pages/paises";

import {
  Routes,
  Route
} from "react-router-dom"


const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemones" element={<Pokemones />} />
      <Route path="/juegos" element={<Juegos />} />
      <Route path="/pokemon/:name" element={<VerDetalles />} />
      <Route path="/name/:name_country" element={<Paises />} />
    </Routes>
)

export default App;
