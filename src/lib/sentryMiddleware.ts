import { createMiddleware } from "@tanstack/react-start";
import * as Sentry from "@sentry/tanstackstart-react";

/**
 * Sentry middleware that automatically captures server-side errors.
 * Apply this middleware to server functions to send exceptions to Sentry.
 *
 * @example
 * ```ts
 * export const myServerFn = createServerFn({ method: "GET" })
 *   .middleware([sentryMiddleware])
 *   .handler(async () => {
 *     // Your server function logic
 *   });
 * ```
 */
export const sentryMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		try {
			const result = await next();
			// Handle case where error is returned in result object (workaround for older versions)
			if (result && typeof result === "object" && "error" in result && result.error) {
				throw result.error;
			}
			return result;
		} catch (error) {
			Sentry.captureException(error);
			throw error;
		}
	},
);
