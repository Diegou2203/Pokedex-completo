import Home from "./pages/home";
import Pokemones from "./pages/pokemones";

import {
  Routes,
  Route
} from "react-router-dom"


const App = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemones" element={<Pokemones />} />
    </Routes>
)

export default App;
