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


  const filteredPokemon = allPokemons.filter((p) =>
    p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#1a1a1a]">

        <div className="w-full flex items-center justify-center ">   
        <h1 className="font-mono mt-10 text-8xl text-center ml-3 mr-3"
        style={{
          color: 'yellow',
          WebkitTextStroke: '6px black',
          paintOrder: 'stroke fill' 
        }}>
          Pokédex
        </h1>
        </div>
        
        <div className="flex font-serif mt-10 font-size-2xl justify-center">
          <NavLink to="/">        
            <button className="w-48 bg- h-20 border-3 bg-red-500 text-black border-black-500 hover:bg-gray-100 font-bold rounded-full hover shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Volver al inicio</button>
          </NavLink>
        </div>


        <div className="max-w-md mx-auto px-4">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            className="w-full bg-white p-3 mt-10 mb-10 border-2 border-black-300 rounded-xl shadow-md"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
  
        {/* listado de pokemones*/}      
        <section className="mx-auto p-4 font-weight: 200">
            <div className="flex flex-wrap justify-center gap-9">

            {/* validaciones*/}

            {!isLoading && isError && (
              <p className="text-center text-2xl font-bold mt-10">Error al cargar los pokemones</p>
            )}

            {!isLoading && !isError && pokemones.length === 0 && (
              <p className="text-center text-2xl font-bold mt-10">No se encontraron pokemones</p>
            )}

            {/* SKELETON INICIAL*/}

            {isLoading && (
              <div className="flex flex-wrap gap-9 justify-center items-center">
                {/* CAMBIADO A LENGTH 20 */}
                {Array.from({ length: 20 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="p-10 transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-gray-200 animate-pulse w-64 h-80"
                  >
                    <div className="bg-gray-300 rounded-full w-32 h-32 mx-auto mb-4 border-2 border-gray-400" />
                    <div className="h-6 bg-gray-300 w-3/4 mx-auto rounded mt-4" />
                    <div className="h-4 bg-gray-300 w-1/2 mx-auto rounded mt-3" />
                  </div>
                ))}
              </div>
            )}


            {!isError && filteredPokemon.map( (p) => (
              <NavLink to={`/pokemon/${p.name}`} key={p.id}>
                <div  
                  key={p.id}
                  className="p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-[#FFDE00] w-64"
                >  
                  <div className="bg-white border-2 border-black rounded-full p-4 mb-4">
                    <img 
                      src={p.sprites?.front_default} 
                      alt="Imagen del Pokémon"
                      className="w-29 h-29 drop-shadow-md"
                    />
                  </div>

                  <div className="mt-4">
                    <h2 className="font-black text-2xl text-black uppercase italic">
                      {p.name}
                    </h2>
                  </div>
                </div>
              </NavLink>
              ))}
            </div>


            {isFetchingNextPage && (
              <div className="flex flex-wrap gap-9 justify-center items-center mt-10">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div 
                    key={index} 
                    className="p-10 transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-gray-200 animate-pulse w-64 h-80"
                  >
                    <div className="bg-gray-300 rounded-full w-32 h-32 mx-auto mb-4 border-2 border-gray-400" />
                    <div className="h-6 bg-gray-300 w-3/4 mx-auto rounded mt-4" />
                    <div className="h-4 bg-gray-300 w-1/2 mx-auto rounded mt-3" />
                  </div>
                ))}
              </div>
            )}


            {hasNextPage && !searchTerm && (
              <div className="flex justify-center mt-12 mb-10">
                <button 
                
                  onClick={() => fetchNextPage()} 

                  disabled={isFetchingNextPage}
                  className="bg-red-500 text-white border-4 border-black px-10 py-4 rounded-xl font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none disabled:opacity-50"
                >
                  {isFetchingNextPage ? "CARGANDO..." : "CARGAR MÁS"}
                </button>
              </div>
            )}
          </section>
    </div>
  )
}


export default Pokemones;
