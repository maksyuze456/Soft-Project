import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../fn/getPokemon";

type PokemonData = Awaited<ReturnType<typeof getPokemon>>;

export function usePokemon(id: string, initialData?: PokemonData) {
	return useQuery({
		queryKey: ["pokemon", id],
		queryFn: () => getPokemon({ data: { id } }),
		initialData,
	});
}
