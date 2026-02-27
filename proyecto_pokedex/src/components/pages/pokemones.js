import {useState } from "react";
import { NavLink } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";

//async significa que puede contener operaciones que tardan en completarse, como llamadas a APIs o temporizadores. 
// Esto permite usar la palabra clave await dentro de la función para esperar a que esas operaciones se completen antes de continuar con el código. 
// En este caso, fetchPokemons es una función asíncrona porque realiza una llamada a la API de PokeAPI para obtener datos de los pokemones, 
// y necesitamos esperar a que esa llamada se complete antes de procesar los datos recibidos.
const fetchPokemons = async ({ pageParam = 0 }) => {

  //esto es para limitar la cantidad de pokemones que se cargan por página, 
  const limit = 20;

  // PokeAPI no tiene un endpoint específico para paginar, así que usamos el endpoint general con limit y offset
  // offset se calcula como pageParam, que es el número de pokemones ya cargados
  // Ejemplo: para la primera página, pageParam = 0, entonces offset = 0. Para la segunda página, pageParam = 20, entonces offset = 20, etc.
  // Esto nos permite cargar los pokemones de 20 en 20 a medida que el usuario hace scroll o presiona el botón de cargar más

  //await es necesario para esperar a que la respuesta de la API llegue antes de continuar con el código, ya que fetch es una operación asíncrona.
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${pageParam}`);
  
  //esto maneja el error en caso de que la respuesta no sea exitosa (por ejemplo, si la API está caída o hay un problema de red).
  if (!res.ok) throw new Error('Error al cargar los pokemones');

  //esto convierte la respuesta de la API en formato JSON, lo cual es necesario para poder trabajar con los datos de los pokemones en nuestro código.
  const data = await res.json();

  //esto es necesario porque el endpoint de la API que estamos usando solo devuelve información básica de cada Pokémon (nombre y URL), 
  // y necesitamos hacer una llamada adicional para obtener los detalles completos de cada Pokémon (como su imagen, tipos, altura, peso, etc.).
  // Por lo tanto, mapeamos sobre los resultados básicos y hacemos una llamada fetch adicional para cada Pokémon usando la URL proporcionada en la respuesta.
  const detailedPromises = data.results.map(async (p) => {
    const detailRes = await fetch(p.url);
    return await detailRes.json();
  });

  //Promise.all se utiliza para esperar a que todas las promesas de detalle se resuelvan antes de continuar.
  //Promise.all toma un array de promesas (en este caso, las promesas de detalle para cada Pokémon) y devuelve una nueva promesa que se resuelve cuando todas las promesas del array se han resuelto.
  const results = await Promise.all(detailedPromises);

  return {

    // Esto devuelve un objeto con dos propiedades: pokemons, que contiene la lista de pokemones detallados, 
    // y , que indica el cursor para la siguiente página de resultados.
    pokemons: results,

    //data es la respuesta original de la API que contiene la información básica de los pokemones,
    //  incluyendo el campo next que indica si hay más pokemones para cargar.

    //data tiene los pokemones con url y nombre original
    nextAncla: data.next ? pageParam + limit : undefined, 
  };
}


function Pokemones() {
  //useInfiniteQuery es un hook de React Query que se utiliza para manejar la paginación de datos de manera eficiente.
const {
    data, // contiene los datos de los pokemones cargados hasta el momento, organizados en páginas.
    isLoading, // indica si la consulta está en proceso de carga, lo que nos permite mostrar un mensaje de "Cargando..." mientras se obtienen los datos.
    isError, // indica si ocurrió un error durante la consulta, lo que nos permite mostrar un mensaje de error si no se pudieron cargar los pokemones.
    fetchNextPage, // es una función que se llama para cargar la siguiente página de pokemones cuando el usuario presiona el botón de "Cargar más".
    isFetchingNextPage, // indica si se está cargando la siguiente página de pokemones, lo que nos permite mostrar un mensaje de "Cargando..." en el botón mientras se obtienen los nuevos datos.
    hasNextPage // indica si hay más páginas de pokemones para cargar, lo que nos permite mostrar u ocultar el botón de "Cargar más" según corresponda.
  } = useInfiniteQuery({ 
    queryKey: ['pokemones'],
    //useInfiniteQuery requiere una función de consulta (queryFn) que se encargue de obtener los datos de los pokemones.
    queryFn: fetchPokemons, //devuelve todo el arreglo de pokemones con su información detallada, y también incluye el campo nextAncla que indica el cursor para la siguiente página de resultados.
    
    //getNextPageParam utiliza los resultados de queryFn para determinar el cursor o ancla para la siguiente página de resultados. En este caso, se basa en el campo next de la respuesta original de la API para calcular el offset de la siguiente página.
    getNextPageParam: (lastPage) => lastPage.nextAncla,
  });

  //esto es para obtener la lista de pokemones de la primera página de resultados, o un array vacío si no hay datos disponibles.}
  //porque cntiene todo si dice data 
  const pokemones = data?.pages?.[0]?.pokemons ?? [];
  const [searchTerm, setSearchTerm] = useState("");

  //esto es para obtener una lista de todos los pokemones cargados hasta el momento, combinando los resultados de todas las páginas obtenidas a través de useInfiniteQuery.
  //flatmap se utiliza para aplanar el array de páginas en un solo array de pokemones, lo que nos permite trabajar con una lista completa de pokemones cargados hasta el momento, independientemente de cuántas páginas se hayan obtenido. 
  const allPokemons = data?.pages.flatMap(page => page.pokemons) ?? [];


  const filteredPokemon = allPokemons.filter((p) =>
    p.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  //validaciones

  if(isLoading) return <p className="text-center text-2xl font-bold mt-10">Cargando...</p>

  if(!isLoading && isError) return <p className="text-center text-2xl font-bold mt-10">Error al cargar los pokemones</p>

  if(!isLoading && !isError && pokemones.length === 0) return <p className="text-center text-2xl font-bold mt-10">No se encontraron pokemones</p>


  // mostrar pokedex  

  return (
    <div>
        <div className="w-full flex items-center justify-center ">
        <img src="https://th.bing.com/th/id/OIP.fnfCynIEx_dLpdZrZuZVywHaHa?w=176&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="Logo"/>        
        <h1 className="font-mono text-8xl text-center ml-3 mr-3"
        style={{
          color: 'black',
          WebkitTextStroke: '3px black',
          paintOrder: 'stroke fill' 
        }}>
          Pokédex
        </h1>
        <img src="https://th.bing.com/th/id/OIP.fnfCynIEx_dLpdZrZuZVywHaHa?w=176&h=180&c=7&r=0&o=7&pid=1.7&rm=3" alt="Logo"/>
        </div>
        
        <div className="flex font-serif font-size-2xl justify-center">
          <NavLink to="/">        
            <button className="w-48 h-20 border-3 border-black-500 hover:bg-gray-100 font-bold rounded-full hover">Volver al inicio</button>
          </NavLink>
        </div>


        <div className="max-w-md mx-auto px-4">
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            className="w-full p-3 mt-10 mb-10 border-2 border-black-300 rounded-xl shadow-md outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

      
      <section className="mx-auto p-4 font-weight: 200">
          <div className="flex flex-wrap justify-center gap-9">
            {filteredPokemon.map(p => (
              <div 
                key={p.id}
                className="p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-[#FFDE00] w-64"
              >  
              <div className="bg-white border-2 border-black rounded-full p-4 mb-4">
                  <img 
                    src={p.sprites?.front_default} 
                    alt={p.name} 
                    className="w-32 h-32 drop-shadow-md"
                  />
              </div>

              <div className="mt-4">
                  <h2 className="font-black text-2xl text-black uppercase italic">
                    {p.name}
                  </h2>

                  <div className="mt-2 py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">
                    {p.types?.map(t => t.type.name.toUpperCase()).join(' / ')}
                  </div>
                  
                  <p className="text-xs text-black font-bold mt-3 border-t-2 border-black/20 pt-2">
                    ALTURA: {p.height} | PESO: {p.weight}
                  </p>
                </div>
              </div>
            ))}
          </div>

    
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
