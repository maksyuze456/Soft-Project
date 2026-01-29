import { useNavigate } from "@tanstack/react-router";
import { PokemonCard } from "@/components/PokemonCard";
import { usePokemon } from "./hooks/usePokemon";
import type { getPokemon } from "./fn/getPokemon";

type PokemonData = Awaited<ReturnType<typeof getPokemon>>;

interface PokemonDetailPageProps {
	id: string;
	loaderData?: PokemonData;
}

export function PokemonDetailPage({ id }: PokemonDetailPageProps) {
	const { data: pokemon, isLoading, isError } = usePokemon(id);
	const navigate = useNavigate();

	if (isLoading) return <div>Loading...</div>;
	if (isError || !pokemon) return <div>Error loading pokemon</div>;

	return (
		<div>
			<PokemonCard
				pokemon={{
					id: pokemon.id,
					name: pokemon.name,
					url: pokemon.sprites?.dream_world?.front_default ?? "",
				}}
				onAction={() => navigate({ to: "/pokemons" })}
			/>
		</div>
	);
}
