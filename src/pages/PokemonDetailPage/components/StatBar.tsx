import { cn } from "@/lib/utils";

type StatBarProps = {
	label: string;
	value: number;
	maxValue?: number;
};

const STAT_LABELS: Record<string, string> = {
	hp: "HP",
	attack: "Attack",
	defense: "Defense",
	"special-attack": "Sp. Atk",
	"special-defense": "Sp. Def",
	speed: "Speed",
};

function getStatColor(value: number, maxValue: number): string {
	const percentage = (value / maxValue) * 100;
	if (percentage >= 80) return "bg-emerald-500";
	if (percentage >= 60) return "bg-green-500";
	if (percentage >= 40) return "bg-yellow-500";
	if (percentage >= 20) return "bg-orange-500";
	return "bg-red-500";
}

function getPercentileLabel(value: number, maxValue: number): string {
	const percentage = (value / maxValue) * 100;
	if (percentage >= 80) return "Excellent";
	if (percentage >= 60) return "Good";
	if (percentage >= 40) return "Average";
	if (percentage >= 20) return "Below Avg";
	return "Low";
}

export function StatBar({ label, value, maxValue = 255 }: StatBarProps) {
	const percentage = Math.min((value / maxValue) * 100, 100);
	const displayLabel = STAT_LABELS[label] || label;
	const colorClass = getStatColor(value, maxValue);
	const percentileLabel = getPercentileLabel(value, maxValue);

	return (
		<div className="flex items-center gap-3" data-testid={`stat-${label}`}>
			<span className="w-20 text-sm font-medium text-muted-foreground shrink-0">
				{displayLabel}
			</span>
			<span className="w-10 text-sm font-bold text-right shrink-0">
				{value}
			</span>
			<div className="relative flex-1 h-3 bg-muted rounded-full overflow-hidden">
				<div
					className={cn(
						"absolute inset-y-0 left-0 rounded-full transition-all duration-500",
						colorClass,
					)}
					style={{ width: `${percentage}%` }}
					data-testid={`stat-bar-${label}`}
				/>
			</div>
			<span
				className={cn(
					"w-20 text-xs font-medium text-right shrink-0",
					percentage >= 60
						? "text-green-600 dark:text-green-400"
						: "text-muted-foreground",
				)}
				data-testid={`stat-percentile-${label}`}
			>
				{percentileLabel}
			</span>
		</div>
	);
}
