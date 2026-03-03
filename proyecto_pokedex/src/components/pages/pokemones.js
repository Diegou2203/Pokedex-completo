import {useState } from "react";
import { NavLink } from "react-router-dom";
import { usePokemonInfinite } from "../hooks/usePokemonInfinite";

function Pokemones() {
  //useInfiniteQuery es un hook de React Query que se utiliza para manejar la paginación de datos de manera eficiente.
const {
    data, // contiene los datos de los pokemones cargados hasta el momento, organizados en páginas.
    isLoading, // indica si la consulta está en proceso de carga, lo que nos permite mostrar un mensaje de "Cargando..." mientras se obtienen los datos.
    isError, // indica si ocurrió un error durante la consulta, lo que nos permite mostrar un mensaje de error si no se pudieron cargar los pokemones.
    fetchNextPage, // es una función que se llama para cargar la siguiente página de pokemones cuando el usuario presiona el botón de "Cargar más".
    isFetchingNextPage, // indica si se está cargando la siguiente página de pokemones, lo que nos permite mostrar un mensaje de "Cargando..." en el botón mientras se obtienen los nuevos datos.
    hasNextPage // indica si hay más páginas de pokemones para cargar, lo que nos permite mostrar u ocultar el botón de "Cargar más" según corresponda.
  } = usePokemonInfinite();

  //esto es para obtener la lista de pokemones de la primera página de resultados, o un array vacío si no hay datos disponibles.}
  const pokemones = data?.pages?.[0]?.pokemons ?? [];
  const [searchTerm, setSearchTerm] = useState("");

  //esto es para obtener una lista de todos los pokemones cargados hasta el momento, combinando los resultados de todas las páginas obtenidas a través de useInfiniteQuery.
  //flatmap se utiliza para aplanar el array de páginas en un solo array de pokemones, lo que nos permite trabajar con una lista completa de pokemones cargados hasta el momento, independientemente de cuántas páginas se hayan obtenido. 
  const allPokemons = data?.pages.flatMap(page => page.pokemons) ?? [];



  const filteredPokemon = searchTerm
    ? allPokemons
        .filter((p) =>
          p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        )
        .sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
    : allPokemons;


  return (
  <div className="min-h-screen bg-gradient-to-b from-yellow-900 via-red-800 to-orange-900 pb-20">

    {/* Header */}
    <header className="flex flex-col items-center pt-10">
      <h1 className="text-8xl font-extrabold text-yellow-400 drop-shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] uppercase tracking-wider">
        Pokédex
      </h1>
      <NavLink to="/">
        <button className="mt-6 px-12 py-4 bg-red-500 text-black font-bold rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition">
          Volver al inicio
        </button>
      </NavLink>
    </header>

    {/* Buscador */}
    <div className="max-w-md mx-auto px-4 mt-10">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-black bg-gray-100 text-gray-900 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-400 transition"
      />
    </div>

    {/* Listado de Pokémons */}
    <section className="max-w-6xl mx-auto px-4 mt-12">
      <div className="flex flex-wrap justify-center gap-8">

        {/* Error o sin resultados */}
        {!isLoading && isError && <p className="text-red-500 text-2xl font-bold text-center w-full">Error al cargar los pokemones</p>}
        {!isLoading && !isError && pokemones.length === 0 && <p className="text-gray-200 text-2xl font-bold text-center w-full">No se encontraron pokemones</p>}

        {/* Skeleton Loading */}
        {isLoading && Array.from({ length: 20 }).map((_, index) => (
          <div
            key={index}
            className="w-64 h-80 bg-gray-300 border-4 border-black rounded-xl flex flex-col items-center justify-center animate-pulse"
          >
            <div className="w-32 h-32 bg-gray-400 rounded-full mb-4 border-2 border-gray-500" />
            <div className="h-6 w-3/4 bg-gray-400 rounded mb-2" />
            <div className="h-4 w-1/2 bg-gray-400 rounded" />
          </div>
        ))}

        {/* Pokémons */}
        {!isError && filteredPokemon.map(p => (
          <NavLink key={p.id} to={`/pokemon/${p.name}`}>
            <div className="w-64 h-80 bg-yellow-400 border-4 border-black rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-2 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition flex flex-col items-center justify-center text-center">
              <div className="bg-white border-2 border-black rounded-full p-4 mb-4">
                <img src={p.sprites?.front_default} alt={p.name} className="w-32 h-32" />
              </div>
              <h2 className="text-2xl font-extrabold uppercase italic text-black">{p.name}</h2>
            </div>
          </NavLink>
        ))}

      </div>

      {/* Skeleton al cargar siguiente página */}
      {isFetchingNextPage && (
        <div className="flex flex-wrap justify-center gap-8 mt-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              key={index}
              className="w-64 h-80 bg-gray-300 border-4 border-black rounded-xl flex flex-col items-center justify-center animate-pulse"
            >
              <div className="w-32 h-32 bg-gray-400 rounded-full mb-4 border-2 border-gray-500" />
              <div className="h-6 w-3/4 bg-gray-400 rounded mb-2" />
              <div className="h-4 w-1/2 bg-gray-400 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* Botón “Cargar más” */}
      {hasNextPage && !searchTerm && (
        <div className="flex justify-center mt-12">
          <button
            onClick={fetchNextPage}
            disabled={isFetchingNextPage}
            className="px-12 py-4 bg-red-500 text-white border-4 border-black rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none disabled:opacity-50 transition"
          >
            {isFetchingNextPage ? "CARGANDO..." : "CARGAR MÁS"}
          </button>
        </div>
      )}

    </section>
  </div>
);
}


export default Pokemones;
