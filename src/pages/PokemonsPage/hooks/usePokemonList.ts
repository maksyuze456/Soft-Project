import type { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { usePagination } from "./usePagination";
import { usePokemonPage } from "./usePokemonPage";
import { useSearchPokemon } from "./useSearchPokemon";
import type { PokemonEntry } from "@/types/PokemonTypes";

const PAGE_SIZE = 8;

const columns: ColumnDef<PokemonEntry>[] = [
	{ accessorKey: "name" },
	{ accessorKey: "url" },
];

export function usePokemonList() {
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearch = useDebounce(searchQuery, 300);
	const isSearching = debouncedSearch.trim().length > 0;

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: PAGE_SIZE,
	});

	const offset = pagination.pageIndex * pagination.pageSize;

	const pageQuery = usePokemonPage(PAGE_SIZE, offset);
	const searchQueryResult = useSearchPokemon(debouncedSearch, PAGE_SIZE, offset);

	const activeQuery = isSearching ? searchQueryResult : pageQuery;
	const { data, isLoading, isError, isPlaceholderData } = activeQuery;

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

	return {
		searchQuery,
		debouncedSearch,
		isSearching,
		handleSearchChange,
		pokemonList: data?.results ?? [],
		totalCount: data?.count ?? 0,
		isLoading,
		isError,
		isPlaceholderData,
		table,
	};
}
