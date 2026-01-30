import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	return (
		<div className="flex flex-1 flex-col items-center justify-center overflow-hidden p-8">
			<h1 className="text-4xl font-bold">Welcome to the Pokemon World</h1>
			<p className="mt-4 text-lg text-muted-foreground">
				Discover and explore your favorite Pokemon
			</p>
			<Link
				to="/pokemons"
				className="mt-8 rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-600"
			>
				Explore Pokemon
			</Link>
		</div>
	);
}
