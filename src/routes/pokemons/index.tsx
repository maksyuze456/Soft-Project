import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { Pagination } from "@/components/Pagination";
import { PokemonCard } from "@/components/PokemonCard";
import { SearchInput } from "@/components/SearchInput";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "@/hooks/usePagination";
import { usePokemonPage } from "@/hooks/usePokemonPage";
import { useSearchPokemon } from "@/hooks/useSearchPokemon";
import { buildSpriteUrl, extractIdFromUrl } from "@/lib/utils";
import type { PokemonEntry } from "@/types/PokemonTypes";

export const Route = createFileRoute("/pokemons/")({
	component: RouteComponent,
});

const PAGE_SIZE = 20;

const columns: ColumnDef<PokemonEntry>[] = [
	{ accessorKey: "name" },
	{ accessorKey: "url" },
];

function RouteComponent() {
	const navigate = useNavigate();

	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearch = useDebounce(searchQuery, 300);
	const isSearching = debouncedSearch.trim().length > 0;

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	});

	const offset = pagination.pageIndex * pagination.pageSize;

	// Use search hook when searching, otherwise use regular pagination
	const pageQuery = usePokemonPage(PAGE_SIZE, offset);
	const searchQueryResult = useSearchPokemon(
		debouncedSearch,
		PAGE_SIZE,
		offset,
	);

	const activeQuery = isSearching ? searchQueryResult : pageQuery;
	const { data, isLoading, isError, isPlaceholderData } = activeQuery;

	// Reset pagination when search query changes
	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	};

	const table = usePagination<PokemonEntry>({
		data: data?.results ?? [],
		columns,
		totalCount: data?.count ?? 0,
		pagination,
		onPaginationChange: setPagination,
	});
	if (isLoading) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-lg text-muted-foreground">Loading Pokemon...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center py-20">
				<p className="text-lg text-destructive">
					Failed to load Pokemon. Please try again.
				</p>
			</div>
		);
	}

	const pokemonList = data?.results ?? [];

	return (
		<div className="mx-auto max-w-5xl px-4 py-8">
			<h1 className="mb-6 text-2xl font-bold tracking-tight">Pokemon</h1>

			<SearchInput
				value={searchQuery}
				onChange={handleSearchChange}
				placeholder="Search Pokemon by name..."
				className="mb-6"
			/>

			{isSearching && data?.count === 0 && !isLoading && (
				<div className="flex items-center justify-center py-10">
					<p className="text-muted-foreground">
						No Pokemon found for "{debouncedSearch}"
					</p>
				</div>
			)}

			<div
				className={`grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 ${isPlaceholderData ? "opacity-60" : ""}`}
			>
				{pokemonList.map((entry) => {
					const id = extractIdFromUrl(entry.url);
					return (
						<PokemonCard
							key={entry.name}
							size="md"
							pokemon={{
								id,
								name: entry.name,
								url: buildSpriteUrl(id),
							}}
							onAction={() =>
								navigate({ to: "/pokemons/$id", params: { id: String(id) } })
							}
						/>
					);
				})}
			</div>

			<Pagination table={table} />
		</div>
	);
}
