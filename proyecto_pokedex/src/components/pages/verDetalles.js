import { useParams} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const fetchOnePokemon = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("No se encontró el Pokémon");
  return await res.json();
};


const VerDetalles = () => {
    const { name } = useParams();

    const {data, isLoading, isError } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => fetchOnePokemon(name),
    });

    if (isError) return <div className="text-center mt-20">Error al cargar datos.</div>;


    return(
    


        
    <div className="min-h-screen bg-[#1a1a1a] flex items-center justify-center">

        {isLoading && (
          <div className="p-10 transition-all flex flex-col items-center text-center border-4 border-black rounded-3xl bg-gray-200 animate-pulse w-full max-w-lg h-[600px]">
          <div className="bg-gray-300 rounded-full w-40 h-40 mt-4 mb-4 border-2 border-gray-400" />
          <div className="h-10 bg-gray-300 w-1/2 rounded mt-4" />
          <div className="h-6 bg-gray-300 w-1/4 rounded mt-6" />
          <div className="h-10 bg-gray-300 w-3/4 rounded mt-2" />
          <div className="h-6 bg-gray-300 w-1/4 rounded mt-6" />
          <div className="h-10 bg-gray-300 w-3/4 rounded mt-2" />
          </div>
        )
        }

        {!isLoading && data && (
        <div  
            key={data.id}
            className=" p-10 w-100 transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-[#FFDE00] w-64"
        >  
            <div className="bg-white border-2 border-black rounded-full p-4 mb-4">
                <img 
                    src={data.sprites?.front_default} 
                    alt="Imagen del Pokémon"
                    className="w-40 h-40 drop-shadow-md"
                />
            </div>
            <div >
                <h2 className="font-black text-2xl text-black uppercase italic">
                    {data.name}
                </h2>
            </div>

             <h2 className="font-black mt-6 text-1xl text-black uppercase italic">
                Tipos:
            </h2>

            <div className="mt-2 py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">     
                {data.types?.map(t => t.type.name.toUpperCase()).join(' / ')}
            </div>

            <h2 className="font-black mt-6 text-1xl text-black uppercase italic">
                MOVIMIENTOS:
            </h2>

            <div className="mt-2 w-full py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">     
                {data.moves?.map(m => m.move.name.toUpperCase()).slice(0,3).join(' / ')}
            </div>

            <h2 className="font-black mt-6 text-1xl text-black uppercase italic">
                ESTADÍSTICAS BASE:
            </h2>

            <div className="mt-2 w-full py-1 px-3 bg-black text-white rounded-lg text-xs font-bold">     
                {data.stats?.map(s => (
                    <div key={s.stat.name} className="flex justify-between">
                    <span>{s.stat.name.toUpperCase()}</span>
                    <span>{s.base_stat}</span>
                    </div>
                ))}
            </div>

            <strong className="text-black italic font-bold mt-6 border-t-2 border-black/20 pt-2">
                ALTURA: {data.height} cm | PESO: {data.weight} kg
            </strong>  
        </div>
        )}
    </div>
    )
}




export default VerDetalles;