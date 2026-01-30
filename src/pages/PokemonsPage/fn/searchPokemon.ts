import { createServerFn } from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";
import { baseUrl } from "@/lib/utils";
import { sentryMiddleware } from "@/lib/sentryMiddleware";

export const searchPokemon = createServerFn({ method: "GET" })
	.inputValidator(
		(data: { query: string; limit?: number; offset?: number }) => data,
	)
	.middleware([sentryMiddleware])
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
		Sentry.metrics.count("external.api.request", 1, {
			attributes: {
				endpoint: "/pokemon-species",
			}
		});

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

		Sentry.metrics.count("pokemon.search.requests", 1, {
			attributes: {
				query: query,
				result_count: filtered.length.toString(),
			}
		});

		return {
			count: filtered.length,
			results: paginatedResults,
		};
	});
