import { fetchOneCountry } from "../services/fetchAllCountries";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const Paises = () => {
    
    const { name_country } = useParams();

    const {data, isLoading, isError } = useQuery({
        queryKey: ["paises", name_country],
        queryFn: () => fetchOneCountry(name_country),
    });

    
    if (isError) return <div className="text-center mt-20">Error al cargar datos.</div>;

    return(
    

    <div className=" flex flex-col min-h-screen bg-gradient-to-br from-blue-400 via-green-600 to-yellow-900 flex items-center justify-center">
        <NavLink to={`/`}>
            <button className="mt-6  mb-20 px-12 py-4 bg-red-500 text-black font-bold rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition">
            Volver al inicio
            </button>
        </NavLink>
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

        {!isLoading && data?.[0] && (
        <div  
            key={data?.[0].id}
            className=" p-10 w-100 transition-all flex flex-col items-center text-center border-4 border-black rounded-xl bg-yellow-400 w-64"
        >  
            <div className="p-4 mb-4">
                <img 
                    src={data?.[0].flags?.png} 
                    alt="Bandera del pais"
                    className="w-40 h-40 drop-shadow-md"
                />
            </div>
            <div >
                <h2 className="font-black text-2xl text-black uppercase italic">
                    {data?.[0].name?.common}
                </h2>
            </div>

             <h2 className="font-black mt-6 text-1xl text-black uppercase italic">
                Idiomas:
            </h2>

            <div className="mt-2 py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">     
                {data?.[0]?.languages ? Object.values(data[0].languages).slice(0,3).join(" / ") : "N/A"}
            </div>

            <h2 className="font-black mt-6 text-1xl text-black uppercase italic">
                Cantidad de población:
            </h2>

            <div className="mt-2 w-fit py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">     
                {data?.[0].population}
            </div>

            <h2 className="font-black mt-6 text-1xl text-black uppercase italic">
                Capital:
            </h2>

            <div className="mt-2 w-fit py-1 px-3 bg-black text-white rounded-full text-xs font-bold inline-block">     
                {data?.[0].capital}
            </div>
        </div>
        )}
    </div>
    )
}

export default Paises