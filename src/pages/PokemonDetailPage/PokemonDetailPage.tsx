import { useNavigate } from "@tanstack/react-router";
import { BackButton } from "@/components/BackButton";
import { PokemonCard } from "@/components/PokemonCard";
import { PokemonDetailSkeleton } from "./components/PokemonDetailSkeleton";
import { PokemonStats } from "./components/PokemonStats";
import type { getPokemon } from "./fn/getPokemon";
import { usePokemon } from "./hooks/usePokemon";

type PokemonData = Awaited<ReturnType<typeof getPokemon>>;

interface PokemonDetailPageProps {
	id: string;
	loaderData?: PokemonData;
}

export function PokemonDetailPage({ id }: PokemonDetailPageProps) {
	const { data: pokemon, isLoading, isError } = usePokemon(id);
	const navigate = useNavigate();

	if (isLoading) return <PokemonDetailSkeleton />;
	if (isError || !pokemon) return <div>Error loading pokemon</div>;

	return (
		<div className="animate-in fade-in duration-300">
			<div className="flex flex-col items-center">
				<div className="w-full max-w-4xl px-4 pt-4">
					<div className="flex justify-start">
						<BackButton />
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6 items-center pt-2">
				<PokemonCard
					pokemon={{
						id: pokemon.id,
						name: pokemon.name,
						url: pokemon.sprites?.dream_world?.front_default ?? "",
					}}
					onAction={() => navigate({ to: "/pokemons" })}
				/>
				{pokemon.stats && pokemon.stats.length > 0 && (
					<PokemonStats stats={pokemon.stats} />
				)}
			</div>
		</div>
	);
}

/*

		<div className="flex flex-col items-center">
			
			<div className="w-full max-w-4xl px-4 pt-4">
				<div className="flex justify-start">
					<BackButton />
				</div>
			</div>

			
			<div className="flex flex-col items-center gap-6 pt-2">
				<PokemonCard
					pokemon={{
						id: pokemon.id,
						name: pokemon.name,
						url: pokemon.sprites?.dream_world?.front_default ?? "",
					}}
					onAction={() => navigate({ to: "/pokemons" })}
				/>

				{pokemon.stats?.length > 0 && (
					<PokemonStats stats={pokemon.stats} />
				)}
			</div>
		</div>

*/
