import { usePokemonList } from "./hooks/usePokemonList";
import { PokemonGrid } from "./components/PokemonGrid";
import { PokemonGridSkeleton } from "./components/PokemonGridSkeleton";
import { Pagination } from "./components/Pagination";
import { SearchInput } from "./components/SearchInput";


export function PokemonsPage() {
	const {
		searchQuery,
		debouncedSearch,
		isSearching,
		handleSearchChange,
		pokemonList,
		totalCount,
		isLoading,
		isError,
		isPlaceholderData,
		table,
	} = usePokemonList();

	if (isError) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-lg text-destructive">
					Failed to load Pokemon. Please try again.
				</p>
			</div>
		);
	}
	return (
		<div className="mx-auto max-w-5xl px-4 py-8">
			<h1 className="mb-4 text-2xl font-bold tracking-tight">Pokemons</h1>
			<SearchInput
				value={searchQuery}
				onChange={handleSearchChange}
				placeholder="Search Pokemon by name..."
				className="mb-6"
				disabled={isLoading}
			/>

			{isLoading ? (
				<PokemonGridSkeleton />
			) : (
				<>
					{isSearching && totalCount === 0 && (
						<div className="flex items-center justify-center py-10">
							<p className="text-muted-foreground">
								No Pokemon found for "{debouncedSearch}"
							</p>
						</div>
					)}

					<PokemonGrid pokemonList={pokemonList} isPlaceholderData={isPlaceholderData} />

					<Pagination table={table} />
				</>
			)}
		</div>
	);
}
