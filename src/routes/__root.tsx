import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import * as Sentry from "@sentry/tanstackstart-react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { queryClient } from "@/lib/queryClient";
import { Header } from "@/components/Header";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootComponent() {
	return (
		
		<QueryClientProvider client={queryClient}>
			<div className="flex min-h-screen w-full flex-col bg-gray-100">
				<Sentry.ErrorBoundary
					beforeCapture={(scope) => scope.setTag("section", "header")}
				>
				<Header />
				</Sentry.ErrorBoundary>
				{/* Main content area with pokeball watermark */}
				<main className="relative flex flex-1 flex-col overflow-auto">
					{/* Pokeball watermark background */}
					<div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
						<svg
							className="h-[600px] w-[600px] text-gray-200 opacity-50"
							viewBox="0 0 100 100"
							fill="currentColor"
							aria-hidden="true"
						>
							<circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
							<path d="M2 50 H98" stroke="currentColor" strokeWidth="4" />
							<circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
							<circle cx="50" cy="50" r="6" fill="currentColor" />
						</svg>
					</div>
					{/* Page content */}
					<div className="relative z-10 flex flex-1 flex-col">
						<Outlet />
					</div>
				</main>
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
