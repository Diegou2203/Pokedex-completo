import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-between overflow-hidden py-20">
      
      <img
        className="absolute inset-0 w-full h-full object-cover opacity-60 blur-[2px]"
        src="https://images.unsplash.com/photo-1613771404721-1f92d799e49f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
        alt="Pokemon Background"
      />

      <div className="mt-40 relative text-center">
        <h2 
          className="text-8xl font-black italic "
          style={{
            color: '#ff1f1f',
            WebkitTextStroke: '3px black',
            paintOrder: 'stroke fill',
          }}
        >
          ¡Atrápalos a todos!
        </h2>
        <NavLink to="/pokemones">
            <button className="mt-50 px-10 py-4 bg-[#FFDE00] text-black font-extrabold text-xl uppercase tracking-widest rounded-full border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe53d] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            Ver Pokédex
            </button>      
        </NavLink>
      
      </div>
    </div>
  );
};

export default Banner;