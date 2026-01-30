import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	component: About,
});

function About() {
	return (
		<div className="mx-auto max-w-5xl px-4 py-8">
			<h1 className="mb-6 text-2xl font-bold tracking-tight">About Us</h1>
			<p className="mt-4 text-muted-foreground">
				Welcome to the Pokemon World! This application allows you to explore and
				discover Pokemon from all generations.
			</p>
		</div>
	);
}
