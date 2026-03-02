export const pokemonService = {
    fetchPokemons: async ({ pageParam = 0, queryKey}) => {

    // número de pokemones por página
    // PokeAPI no tiene un endpoint específico para paginar, así que usamos el endpoint general con limit y offset
    // offset se calcula como pageParam, que es el número de pokemones ya cargados
    // Ejemplo: para la primera página, pageParam = 0, entonces offset = 0. Para la segunda página, pageParam = 20, entonces offset = 20, etc.
    // Esto nos permite cargar los pokemones de 20 en 20 a medida que el usuario hace scroll o presiona el botón de cargar más
    const limit = queryKey[1].limit; //obtenemos el límite de pokemones por página desde el queryKey
    
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

        nextAncla: data.next ? pageParam + limit : undefined, 
    };
    }
};