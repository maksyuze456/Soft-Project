import { createFileRoute } from "@tanstack/react-router";
import { PokemonsPage } from "@/pages/PokemonsPage/PokemonsPage";

export const Route = createFileRoute("/pokemons/")({
	component: PokemonsPage,
});
