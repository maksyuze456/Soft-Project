import { Skeleton } from "@/components/ui/skeleton";
import {
	Card,
	CardContent,
	CardHeader,
} from "@/components/ui/card";

export function PokemonStatsSkeleton() {
	const statCount = 6;

	return (
		<Card className="w-full max-w-sm mx-auto" data-testid="pokemon-stats-skeleton">
			<CardHeader className="pb-2">
				<Skeleton className="h-6 w-24" />
			</CardHeader>
			<CardContent className="space-y-3">
				{Array.from({ length: statCount }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list never reorders
					<div key={index} className="flex items-center gap-3">
						<Skeleton className="w-20 h-4 shrink-0" />
						<Skeleton className="w-10 h-4 shrink-0" />
						<Skeleton className="flex-1 h-3 rounded-full" />
						<Skeleton className="w-20 h-3 shrink-0" />
					</div>
				))}
				<div className="pt-3 border-t border-border">
					<div className="flex items-center justify-between">
						<Skeleton className="h-4 w-12" />
						<Skeleton className="h-6 w-14" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
