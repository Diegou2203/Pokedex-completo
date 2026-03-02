import { useInfiniteQuery } from "@tanstack/react-query";
import { pokemonService } from "../services/pokemonService";

export const usePokemonInfinite = (limit = 20) => {
    return (useInfiniteQuery({ 
    queryKey: ['pokemones', { limit }],
    //useInfiniteQuery requiere una función de consulta (queryFn) que se encargue de obtener los datos de los pokemones.
    queryFn: pokemonService.fetchPokemons, //devuelve todo el arreglo de pokemones con su información detallada, y también incluye el campo nextAncla que indica el cursor para la siguiente página de resultados.
    
    //getNextPageParam utiliza los resultados de queryFn para determinar el cursor o ancla para la siguiente página de resultados. En este caso, se basa en el campo next de la respuesta original de la API para calcular el offset de la siguiente página.
    getNextPageParam: (lastPage) => lastPage.nextAncla}))
}