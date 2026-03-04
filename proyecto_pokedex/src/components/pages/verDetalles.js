import { NavLink, useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { useQuery } from "@tanstack/react-query";
import { fetchOnePokemon } from "../services/onePokemonService";
import { fetchAllCountries } from "../services/fetchAllCountries";
import { useMemo } from "react";

const VerDetalles = () => {
    const { name } = useParams();
    const navigate = useNavigate(); // Hook for programmatic navigation

    const { data, isLoading, isError } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => fetchOnePokemon(name),
    });

    const { data: countriesData } = useQuery({
        queryKey: ["countries"],
        queryFn: () => fetchAllCountries(),
    });

    const randomCountryName = useMemo(() => {
        if (!countriesData || countriesData.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        return countriesData[randomIndex].name?.common;
    }, [countriesData]);

    // Function to handle the outer "card" click
    const handlePokeClick = () => {
        if (randomCountryName) {
            navigate(`/name/${randomCountryName}`);
        }
    };

    if (isError) return <div className="text-center mt-20">Error al cargar datos.</div>;

    return (
        /* Changed outer NavLink to a div */
        <div className="min-h-screen bg-gradient-to-r from-purple-900 via-blue-800 to-green-900 flex flex-col items-center justify-center">

            {isLoading && (
                <div className="p-10 transition-all flex flex-col items-center text-center border-4 border-black rounded-3xl bg-gray-200 animate-pulse w-full max-w-lg h-[600px]">
                    <div className="bg-gray-300 rounded-full w-40 h-40 mt-4 mb-4 border-2 border-gray-400" />
                    <div className="h-10 bg-gray-300 w-1/2 rounded mt-4" />
                    <div className="h-6 bg-gray-300 w-1/4 rounded mt-6" />
                    <div className="h-10 bg-gray-300 w-3/4 rounded mt-2" />
                    <div className="h-6 bg-gray-300 w-1/4 rounded mt-6" />
                    <div className="h-10 bg-gray-300 w-3/4 rounded mt-2" />
                </div>
            )}

            <h2 className="mb-20 font-black mt-6 text-4xl text-yellow-400 uppercase italic text-center px-4">
                Selecciona al Pokémon para ver su país de procedencia
            </h2>

            {/* Internal NavLink is now safe because the parent is a div */}
            <NavLink to="/">
                <button className="mb-20 px-12 py-4 bg-red-500 text-black font-bold rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition">
                    Volver al inicio
                </button>
            </NavLink>

            {!isLoading && data && (
                <div
                    key={data.id}
                    onClick={handlePokeClick} // Click logic moved here
                    className="cursor-pointer p-10 w-100 animate-pulse transition-all flex flex-col items-center text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition border-4 border-black rounded-xl bg-[#FFDE00] w-64"
                >
                    <div className="bg-white border-2 border-black rounded-full p-4 mb-4">
                        <img
                            src={data.sprites?.front_default}
                            alt="Imagen del Pokémon"
                            className="w-40 h-40 drop-shadow-md"
                        />
                    </div>
                    <div>
                        <h2 className="font-black text-2xl uppercase italic">
                            {data.name}
                        </h2>
                    </div>

                    <h2 className="font-black mt-6 text-1xl uppercase italic">Tipos:</h2>
                    <div className="mt-2 py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">
                        {data.types?.map(t => t.type.name.toUpperCase()).join(' / ')}
                    </div>

                    <h2 className="font-black mt-6 text-1xl text-black uppercase italic">MOVIMIENTOS:</h2>
                    <div className="mt-2 w-fit py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">
                        {data.moves?.map(m => m.move.name.toUpperCase()).slice(0, 3).join(' / ')}
                    </div>

                    <h2 className="font-black mt-6 text-1xl text-black uppercase italic">ESTADÍSTICAS BASE:</h2>
                    <div className="mt-2 w-full py-1 px-3 bg-black text-white rounded-lg text-xs font-bold">
                        {data.stats?.map(s => (
                            <div key={s.stat.name} className="flex justify-between">
                                <span>{s.stat.name.toUpperCase()}</span>
                                <span>{s.base_stat}</span>
                            </div>
                        ))}
                    </div>

                    <h2 className="font-black mt-6 text-1xl text-black uppercase italic">ESTADÍSTICAS FÍSICAS:</h2>
                    <strong className="mt-2 w-fit py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">
                        ALTURA: {data.height} cm | PESO: {data.weight} kg
                    </strong>
                </div>
            )}
        </div>
    );
}

export default VerDetalles;