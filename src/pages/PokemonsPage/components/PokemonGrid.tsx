import { useNavigate } from "@tanstack/react-router";
import { PokemonCard } from "@/components/PokemonCard";
import { buildSpriteUrl, extractIdFromUrl } from "@/lib/utils";
import type { PokemonEntry } from "@/types/PokemonTypes";

interface PokemonGridProps {
	pokemonList: PokemonEntry[];
	isPlaceholderData: boolean;
}

export function PokemonGrid({
	pokemonList,
	isPlaceholderData,
}: PokemonGridProps) {
	const navigate = useNavigate();

	return (
		<div
			className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 animate-in fade-in duration-300 ${isPlaceholderData ? "opacity-60" : ""}`}
		>
			{pokemonList.map((entry) => {
				const id = extractIdFromUrl(entry.url);
				return (
					<PokemonCard
						key={entry.name}
						size="md"
						pokemon={{
							id,
							name: entry.name,
							url: buildSpriteUrl(id),
						}}
						onAction={() =>
							navigate({ to: "/pokemons/$id", params: { id: String(id) } })
						}
					/>
				);
			})}
		</div>
	);
}
