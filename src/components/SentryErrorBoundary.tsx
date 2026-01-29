import * as Sentry from "@sentry/tanstackstart-react";
import { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

/**
 * Custom Error Boundary component that can be wrapped with Sentry's withErrorBoundary
 * for automatic error reporting.
 *
 * Usage:
 * - Use `SentryErrorBoundary` for Sentry-wrapped error boundary with automatic reporting
 * - Use `CustomErrorBoundary` if you need the base component without Sentry wrapping
 */
class CustomErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		// You can log error info here if needed
		console.error("Error caught by boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			if (this.props.fallback) {
				return this.props.fallback;
			}

			return (
				<div className="flex flex-col items-center justify-center p-8 text-center">
					<h2 className="text-xl font-semibold text-red-600 mb-2">
						Something went wrong
					</h2>
					<p className="text-gray-600 mb-4">
						{this.state.error?.message || "An unexpected error occurred"}
					</p>
					<button
						type="button"
						onClick={() => this.setState({ hasError: false, error: null })}
						className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					>
						Try again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

/**
 * Sentry-wrapped Error Boundary that automatically reports errors to Sentry.
 *
 * Example usage:
 * ```tsx
 * <SentryErrorBoundary fallback={<MyErrorFallback />}>
 *   <MyComponent />
 * </SentryErrorBoundary>
 * ```
 */
export const SentryErrorBoundary = Sentry.withErrorBoundary(CustomErrorBoundary, {
	// Sentry error boundary options
	// You can customize these options as needed:
	// showDialog: true, // Show Sentry's user feedback dialog
	// dialogOptions: { ... }, // Customize the feedback dialog
});

export { CustomErrorBoundary };
