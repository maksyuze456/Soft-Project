import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type PokemonCardSkeletonProps = {
	size?: "default" | "md";
};

export function PokemonCardSkeleton({
	size = "default",
}: PokemonCardSkeletonProps) {
	const isMd = size === "md";

	return (
		<Card
			data-testid="pokemon-card-skeleton"
			className="group relative mx-auto w-full max-w-sm overflow-hidden pt-0"
		>
			<CardContent
				className={`relative flex items-center justify-center bg-gradient-to-br from-sky-100 to-indigo-200 dark:from-sky-900 dark:to-indigo-950 ${isMd ? "p-4" : "p-6"}`}
			>
				<Skeleton className="absolute top-3 right-3 h-5 w-12 rounded-full" />
				{/* Match exact dimensions of the actual image container */}
				<Skeleton
					className={`rounded-lg ${isMd ? "h-32 w-32" : "h-48 w-48"}`}
				/>
			</CardContent>
			<CardHeader className="pb-0">
				{/* Match CardTitle height: text-base (1rem/16px) for md, text-xl (1.25rem/20px) for default */}
				<Skeleton className={`${isMd ? "h-6 w-24" : "h-7 w-32"}`} />
			</CardHeader>
			<CardFooter>
				<Skeleton className="h-9 w-full" />
			</CardFooter>
		</Card>
	);
}
