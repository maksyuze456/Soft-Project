import { useNavigate } from "@tanstack/react-router";
import { PokemonCard } from "@/components/PokemonCard";
import { usePokemon } from "./hooks/usePokemon";

interface PokemonDetailPageProps {
	id: string;
	loaderData?: any;
}

export function PokemonDetailPage({ id, loaderData }: PokemonDetailPageProps) {
	const { data: pokemon, isLoading, isError } = usePokemon(id, loaderData);
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
