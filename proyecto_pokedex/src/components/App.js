import Home from "./pages/home";
import Pokemones from "./pages/pokemones";
import Juegos from "./pages/juegos";

import {
  Routes,
  Route
} from "react-router-dom"


const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemones" element={<Pokemones />} />
      <Route path="/juegos" element={<Juegos />} />
    </Routes>
)

export default App;
