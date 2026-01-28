import { createFileRoute } from "@tanstack/react-router";
import { PokemonDetailPage } from "@/pages/PokemonDetailPage/PokemonDetailPage";

export const Route = createFileRoute("/pokemons/$id/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const loaderData = Route.useLoaderData();

	return <PokemonDetailPage id={id} loaderData={loaderData} />;
}
