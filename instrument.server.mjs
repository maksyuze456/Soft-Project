import * as Sentry from "@sentry/tanstackstart-react";

Sentry.init({
	dsn: "https://b52dfee984c1a5cb7ed7adb69a81ec10@o4510792811675648.ingest.de.sentry.io/4510792830943312",

	// Setting this option to true will send default PII data to Sentry.
	// For example, automatic IP address collection on events
	sendDefaultPii: true,
	enableLogs: true,
	tracesSampleRate: 1.0
});

console.log("Server sentry init")

