import { createFileRoute } from "@tanstack/react-router";
import { PokemonDetailPage } from "@/pages/PokemonDetailPage/PokemonDetailPage";

export const Route = createFileRoute("/pokemons/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	return <PokemonDetailPage id={id} />;
}
