import * as Sentry from "@sentry/tanstackstart-react";
import { createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {},

		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
	});

	if (!router.isServer) {
		Sentry.init({
			dsn: "https://b52dfee984c1a5cb7ed7adb69a81ec10@o4510792811675648.ingest.de.sentry.io/4510792830943312",
			// Adds request headers and IP for users, for more info visit:
			// https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
			sendDefaultPii: true,
			integrations: [Sentry.tanstackRouterBrowserTracingIntegration(router)],
			// Enable logs to be sent to Sentry
			enableLogs: true,
			// Set tracesSampleRate to 1.0 to capture 100%
			// of transactions for tracing.
			// We recommend adjusting this value in production.
			// Learn more at https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
			tracesSampleRate: 0.2,
		});
	}

	return router;
};
