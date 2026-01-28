import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchPokemon } from "@/fn/searchPokemon";

export function useSearchPokemon(query: string, limit: number, offset: number) {
	return useQuery({
		queryKey: ["pokemonSearch", query, limit, offset],
		queryFn: () => searchPokemon({ data: { query, limit, offset } }),
		placeholderData: keepPreviousData,
		enabled: query.trim().length > 0,
	});
}
