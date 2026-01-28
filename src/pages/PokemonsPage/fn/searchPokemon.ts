import { createServerFn } from "@tanstack/react-start";
import { baseUrl } from "@/lib/utils";

export const searchPokemon = createServerFn({ method: "GET" })
	.inputValidator(
		(data: { query: string; limit?: number; offset?: number }) => data,
	)
	.handler(async ({ data }) => {
		const query = data.query.toLowerCase().trim();
		const limit = data.limit ?? 20;
		const offset = data.offset ?? 0;

		if (!query) {
			return {
				count: 0,
				results: [] as { name: string; url: string }[],
			};
		}

		// Fetch all Pokemon species to filter (PokeAPI doesn't have a search endpoint)
		// Using pokemon-species endpoint to get only base species, not alternate forms
		const response = await fetch(
			`${baseUrl}/pokemon-species?limit=1500&offset=0`,
		);

		if (!response.ok) {
			throw new Error("Failed to fetch Pokémon for search");
		}

		const allPokemon = (await response.json()) as {
			count: number;
			results: { name: string; url: string }[];
		};

		// Filter Pokemon by name matching the query
		const filtered = allPokemon.results.filter((pokemon) =>
			pokemon.name.toLowerCase().includes(query),
		);

		// Apply pagination to filtered results
		// Convert species URLs to pokemon URLs for consistency with the rest of the app
		const paginatedResults = filtered
			.slice(offset, offset + limit)
			.map((species) => ({
				name: species.name,
				// Convert /pokemon-species/ID to /pokemon/ID
				url: species.url.replace("/pokemon-species/", "/pokemon/"),
			}));

		return {
			count: filtered.length,
			results: paginatedResults,
		};
	});
