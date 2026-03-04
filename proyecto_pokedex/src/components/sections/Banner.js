import { NavLink } from "react-router-dom"

const Banner = () => {
  return (
        <div className="h-screen bg-[#222] flex items-center justify-center p-4">

         {/* GAMEBOY */}   
        <div className="bg-[red] w-full max-w-90 rounded-[20px_20px_100px_20px] border-b-[10px] border-r-[10px] border-[#a5051d] p-6">
            
            {/* LUCES */} 
            <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 bg-gray-600 border-4 border-white rounded-full"></div>
            <div className="w-3 h-3 bg-red-500 rounded-full border border-black"></div>
            <div className="w-3 h-3 bg-yellow-300 rounded-full border border-black"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full border border-black"></div>
            </div>

            {/* PANTALLA */}
            <div className="bg-[#98b31d] border-15 p-6 min-h-[300px] flex flex-col items-center justify-center text-center">
                <h1 className="font-mono italic text-3xl font-black text-[#1a2d11] mb-3">
                    GAMEBOY ADVANCE <br/>
                </h1>

                <h1 className="font-mono italic text-2xl font-black text-[#1a2d11] mb-6">
                    GAME FREAK
                </h1>       

                <div className="w-full space-y-4">
                    <NavLink to="/pokemones" className="block">
                    <button className="w-full bg-[#1a2d11] text-[#98b31d] py-3 px-4 font-mono font-bold text-xl uppercase hover:bg-[#2a451a] border-2 border-[#1a2d11] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {">"} Ver Pokédex
                    </button>
                    </NavLink>
                      <NavLink to="/juegos" className="block">
                    <button className="w-full bg-[#1a2d11] text-[#98b31d] py-3 px-4 font-mono font-bold text-xl uppercase hover:bg-[#2a451a] border-2 border-[#1a2d11] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {">"} Ingresa el juego
                    </button>
                    </NavLink>                  
                </div>
            </div>

            {/* CONTROLES */}
            <div className="mt-8 flex justify-between items-center px-2">

            {/* CRUZ DE CONTROL */}
            <div className="relative w-20 h-20 bg-[#333] rounded-sm">
                <div className="absolute top-1/2 left-0 w-full h-6 bg-[#222] -translate-y-1/2 rounded-sm"></div>
                <div className="absolute left-1/2 top-0 w-6 h-full bg-[#222] -translate-x-1/2 rounded-sm"></div>
            </div>

            {/* BOTONES A B */}
            <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#333] rounded-full shadow-lg flex items-center justify-center text-white font-bold pb-1">B</div>
                <div className="w-12 h-12 bg-[#333] rounded-full shadow-lg flex items-center justify-center text-white font-bold pb-1">A</div>
            </div>
            </div>
        </div>
        </div>
  );
};

export default Banner;