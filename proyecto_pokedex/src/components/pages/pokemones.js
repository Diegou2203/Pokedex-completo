import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NavLink } from "react-router-dom";

const fetchPokemons = async () => {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
  const results = res.data.results;

  // Traemos información completa de cada Pokémon
  const detailed = await Promise.all(
    results.map(p => axios.get(p.url).then(res => res.data))
  );

  return detailed;
};

function Pokemones() {

  const [search, setSearch] = useState('');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemones'],
    queryFn: fetchPokemons,
  });

  if (isError) return <p>Error al cargar los pokémon</p>;

  //Skeleton
  if (isLoading) return (
    <div>
      {[...Array(10)].map((_, i) => (
        <div key={i}></div>
      ))}
    </div>
  );


  const filtered = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

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
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

     
     <section className="mx-auto p-4 font-weight: 200">
        <div className="flex flex-wrap justify-center gap-9">
          {filtered.map((pokemon) => (
            <div 
              key={pokemon.id}
              className="p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-[#FFDE00] w-64"
            >  
            <div className="bg-white border-2 border-black rounded-full p-4 mb-4">
                <img 
                  src={pokemon.sprites?.front_default} 
                  alt={pokemon.name} 
                  className="w-32 h-32 drop-shadow-md"
                />
            </div>

            <div className="mt-4">
                <h2 className="font-black text-2xl text-black uppercase italic">
                  {pokemon.name}
                </h2>

                <div className="mt-2 py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">
                  {pokemon.types?.map(t => t.type.name.toUpperCase()).join(' / ')}
                </div>
                
                <p className="text-xs text-black font-bold mt-3 border-t-2 border-black/20 pt-2">
                  ALTURA: {pokemon.height} | PESO: {pokemon.weight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
  </div>
  );
}

export default Pokemones;
