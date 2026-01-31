import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PokemonStat } from "../fn/getPokemon";
import { StatBar } from "./StatBar";

type PokemonStatsProps = {
	stats: PokemonStat[];
};

export function PokemonStats({ stats }: PokemonStatsProps) {
	const totalStats = stats.reduce((sum, stat) => sum + stat.baseStat, 0);

	return (
		<Card className="w-full max-w-sm mx-auto" data-testid="pokemon-stats">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg">Base Stats</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				{stats.map((stat) => (
					<StatBar key={stat.name} label={stat.name} value={stat.baseStat} />
				))}
				<div className="pt-3 border-t border-border">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium text-muted-foreground">
							Total
						</span>
						<span className="text-lg font-bold" data-testid="stats-total">
							{totalStats}
						</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
