import { defineConfig, devices } from "@playwright/test";

// Check if running in headed mode (--headed flag)
const isHeaded = process.argv.includes("--headed");

// Common viewport for full browser view
const fullViewport = { width: 1920, height: 1080 };

export default defineConfig({
	testDir: "./tests/e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",
	use: {
		baseURL: "http://localhost:3000",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
		viewport: fullViewport,
		// Slow down actions when running in headed mode for better visibility
		launchOptions: {
			slowMo: isHeaded ? 500 : 0,
		},
	},
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"], viewport: fullViewport },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"], viewport: fullViewport },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"], viewport: fullViewport },
		},
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},
	],
	webServer: {
		command: "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});
