import { createFileRoute } from "@tanstack/react-router";
import { SentryErrorBoundary } from "@/components/SentryErrorBoundary";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="p-8">
			<h1 className="text-2xl font-bold mb-4">Hello</h1>

			{/* Example: Sentry ErrorBoundary wrapping a component that may throw */}
			<SentryErrorBoundary>
				<SentryTestSection />
			</SentryErrorBoundary>
		</div>
	);
}

/**
 * Test section to verify Sentry integration.
 * Contains a button that throws an error to test Sentry error capturing.
 * REMOVE THIS AFTER VERIFYING SENTRY WORKS.
 */
function SentryTestSection() {
	return (
		<div className="mt-8 p-4 border border-gray-200 rounded-lg">
			<h2 className="text-lg font-semibold mb-2">Sentry Test</h2>
			<p className="text-gray-600 mb-4">
				Click the button below to trigger a test error and verify Sentry is
				working correctly.
			</p>
			<button
				type="button"
				onClick={() => {
					throw new Error("Sentry Test Error");
				}}
				className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
			>
				Break the world
			</button>
		</div>
	);
}
