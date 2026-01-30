import { PokemonCardSkeleton } from "@/components/PokemonCardSkeleton";

interface PokemonGridSkeletonProps {
	count?: number;
}

export function PokemonGridSkeleton({ count = 8 }: PokemonGridSkeletonProps) {
	return (
		<div
			data-testid="pokemon-grid-skeleton"
			className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 animate-in fade-in duration-200"
		>
			{Array.from({ length: count }).map((_, index) => (
				<PokemonCardSkeleton key={index} size="md" />
			))}
		</div>
	);
}
