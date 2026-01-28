import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getPokemonPage } from "@/fn/getPokemonPage";

export function usePokemonPage(limit: number, offset: number) {
	return useQuery({
		queryKey: ["pokemonPage", limit, offset],
		queryFn: () => getPokemonPage({ data: { limit, offset } }),
		placeholderData: keepPreviousData,
	});
}
