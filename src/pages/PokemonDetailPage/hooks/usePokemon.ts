import { useQuery } from "@tanstack/react-query";
import { getPokemon } from "../fn/getPokemon";

export function usePokemon(id: string, initialData?: any) {
	return useQuery({
		queryKey: ["pokemon", id],
		queryFn: () => getPokemon({ data: { id } }),
		initialData,
	});
}
