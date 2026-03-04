export const fetchOnePokemon = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("No se encontró el Pokémon");
  return await res.json();
};

