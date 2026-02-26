import '../styles/output.css';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPokemons = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const results = res.data.results;

  // Traemos información completa de cada Pokémon
  const detailed = await Promise.all(
    results.map(p => axios.get(p.url).then(res => res.data))
  );

  return detailed;
};

function App() {

  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemones'],
    queryFn: fetchPokemons,
  });

  if (isError) return <p>Error al cargar los pokémon</p>;

  //loading code
  if (isLoading) return (
    <div className="flex flex-col space-y-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="h-6 bg-gray-300 rounded animate-pulse"></div>
      ))}
    </div>
  );


  const filtered = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
  <div className="App min-h-screen bg-red-500 p-4">
    <header className="App-header">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        Pokédex
      </h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="w-full max-w-md mx-auto p-2 mb-6 border rounded block"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <section className="max-w-md mx-auto space-y-2 ">
        {filtered.map((pokemon) => (
          <li key={pokemon.id} className="p-2 bg-white rounded hover:bg-gray-200 transition flex items-center space-x-4">
            
            {/* Imagen segura */}
            <img 
              src={pokemon.sprites?.front_default} 
              alt={pokemon.name} 
              className="w-12 h-12"
            />

            <div>
              <h2 className="font-bold">
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </h2>

              {/* Tipos */}
              <p>Tipos: {pokemon.types?.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ')}</p>
              
              {/* Altura y peso */}
              <p>Altura: {pokemon.height} | Peso: {pokemon.weight}</p>
            </div>
          </li>
        ))}
      </section>
    </header>
  </div>
  );
}

export default App;
