import { Skeleton } from "@/components/ui/skeleton";
import { PokemonCardSkeleton } from "@/components/PokemonCardSkeleton";
import { PokemonStatsSkeleton } from "./PokemonStatsSkeleton";

export function PokemonDetailSkeleton() {
	return (
		<div data-testid="pokemon-detail-skeleton" className="animate-in fade-in duration-200">
			<div className="flex flex-col items-center">
				<div className="w-full max-w-4xl px-4 pt-4">
					<div className="flex justify-start">
						<Skeleton className="h-9 w-9 rounded-full" />
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-6 items-center pt-2">
				<PokemonCardSkeleton size="default" />
				<PokemonStatsSkeleton />
			</div>
		</div>
	);
}
