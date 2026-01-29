import { createServerFn } from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";
import { baseUrl } from "@/lib/utils";

export const getPokemon = createServerFn({ method: "GET" })
	.inputValidator((data: { id: string }) => data)
	.handler(async ({ data }) => {
		return Sentry.startSpan(
			{
				name: "getPokemon",
				op: "http.server",
				attributes: {
					"pokemon.requested_id": data.id,
				},
			},
			async (span) => {
				const response = await fetch(`${baseUrl}/pokemon/${data.id}`);
				Sentry.metrics.count("external.api.request", 1, {
					attributes: {
						endpoint: "/pokemon",
					}
				})
				if (!response.ok) {
					span.setStatus({ code: 2, message: "Pokemon not found" });
					throw new Error("Pokemon not found");
				}
				const pokemon = await response.json();

				span.setAttributes({
					"pokemon.name": pokemon.name,
					"pokemon.id": pokemon.id,
					"http.response_status_code": response.status,
				});

				Sentry.metrics.count("pokemon.requests", 1, {
					attributes: {
						pokemon_id: pokemon.id.toString(),
						pokemon_name: pokemon.name,
					}
				})

				return {
					name: pokemon.name,
					id: pokemon.id,
					sprites: pokemon.sprites.other,
				};
			}
		);
	});
