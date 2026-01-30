import { cn } from "@/lib/utils";

interface SearchInputProps {
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export function SearchInput({
	value,
	onChange,
	placeholder = "Search...",
	className,
	disabled = false,
}: SearchInputProps) {
	return (
		<div className={cn("relative", className)}>
			<svg
				className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
				/>
			</svg>
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				disabled={disabled}
				className={cn(
					"h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-ring/50 focus:ring-[3px]",
					disabled && "cursor-not-allowed opacity-50",
				)}
				data-testid="search-input"
			/>
			{value && (
				<button
					type="button"
					onClick={() => onChange("")}
					className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
					aria-label="Clear search"
					data-testid="clear-search"
				>
					<svg
						className="h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18 18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</div>
	);
}
