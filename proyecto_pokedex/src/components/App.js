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
    <div>
      {[...Array(10)].map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );


  const filtered = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
  <div >
    <header>
      <h1 className=" text-8xl relative absolute inset-x-0 top-0 h-16 bg-beige-200 my-2 text-center">
        Pokédex
      </h1>

      <input
        type="text"
        placeholder="Buscar Pokémon..."
        className="w-full max-w-md mt-20 mx-auto p-2 mb-6 border rounded block"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

     <section className="max-w-6xl mx-auto p-4">
        {/* Cambiamos grid-cols-1 por una rejilla responsiva que llega a 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((pokemon) => (
            <div 
              key={pokemon.id} 
              // Cambiamos 'flex items-center' por 'flex flex-col' para que la imagen esté arriba
              className="p-4 bg-white rounded-lg shadow hover:shadow-xl transition flex flex-col items-center text-center border border-gray-100"
            >
              
              {/* Imagen: la centramos y ajustamos tamaño */}
              <img 
                src={pokemon.sprites?.front_default} 
                alt={pokemon.name} 
                className="w-32 h-32 object-contain"
              />

              <div className="mt-4">
                <h2 className="font-bold text-xl text-gray-800">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h2>

                {/* Tipos con un poco más de estilo */}
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Tipos:</span><br />
                  {pokemon.types?.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)).join(', ')}
                </p>
                
                {/* Detalles pequeños */}
                <p className="text-xs text-gray-400 mt-3 border-t pt-2">
                  Altura: {pokemon.height} | Peso: {pokemon.weight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </header>
  </div>
  );
}

export default App;
