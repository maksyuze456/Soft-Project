import { createServerFn } from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";
import { baseUrl } from "@/lib/utils";

export const getPokemonPage = createServerFn({ method: "GET" })
	.inputValidator((data: { limit?: number; offset?: number }) => data)
	.handler(async ({ data }) => {
		const limit = data.limit ?? 20;
		const offset = data.offset ?? 0;

		// Using pokemon-species endpoint to get only base species, not alternate forms
		const response = await fetch(
			`${baseUrl}/pokemon-species?limit=${limit}&offset=${offset}`,
		);
		Sentry.metrics.count("external.api.request", 1, {
			attributes: {
				endpoint: "/pokemon-species",
			}
		});

		if (!response.ok) {
			throw new Error("Failed to fetch Pokémon page");
		}

		const speciesData = (await response.json()) as {
			count: number;
			next: string | null;
			previous: string | null;
			results: { name: string; url: string }[];
		};

		Sentry.metrics.count("pokemon.page.requests", 1, {
			attributes: {
				limit: limit.toString(),
				offset: offset.toString(),
				result_count: speciesData.results.length.toString(),
			}
		});

		// Convert species URLs to pokemon URLs for consistency with the rest of the app
		return {
			count: speciesData.count,
			next: speciesData.next,
			previous: speciesData.previous,
			results: speciesData.results.map((species) => ({
				name: species.name,
				// Convert /pokemon-species/ID to /pokemon/ID
				url: species.url.replace("/pokemon-species/", "/pokemon/"),
			})),
		};
	});
