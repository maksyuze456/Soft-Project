import { test, expect } from "@playwright/test";

test.describe("Visual Regression Tests", () => {
	test.describe("Pokemon List Page", () => {
		test("should match Pokemon list page snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			await page.waitForTimeout(1000);

			await expect(page).toHaveScreenshot("pokemon-list-page.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});

		test("should match Pokemon grid snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			await page.waitForTimeout(1000);

			const grid = page.locator('[class*="grid"]').first();
			await expect(grid).toHaveScreenshot("pokemon-grid.png", {
				maxDiffPixels: 100,
			});
		});

		test("should match pagination controls snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			const pagination = page.locator(
				'div:has(button:has-text("Previous")):has(button:has-text("Next"))'
			);
			await expect(pagination).toHaveScreenshot("pagination-controls.png", {
				maxDiffPixels: 50,
			});
		});

		test("should match search input snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('[data-testid="search-input"]');

			const searchContainer = page
				.locator('div:has([data-testid="search-input"])')
				.first();
			await expect(searchContainer).toHaveScreenshot("search-input.png", {
				maxDiffPixels: 50,
			});
		});

		test("should match search input with value snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('[data-testid="search-input"]');

			const searchInput = page.getByTestId("search-input");
			await searchInput.fill("pikachu");

			const searchContainer = page
				.locator('div:has([data-testid="search-input"])')
				.first();
			await expect(searchContainer).toHaveScreenshot(
				"search-input-with-value.png",
				{
					maxDiffPixels: 50,
				}
			);
		});
	});

	test.describe("Pokemon Detail Page", () => {
		test("should match Pokemon detail page snapshot", async ({ page }) => {
			await page.goto("/pokemons/25");
			await page.waitForSelector('[class*="Card"]', { timeout: 10000 });

			await page.waitForTimeout(1000);

			await expect(page).toHaveScreenshot("pokemon-detail-pikachu.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});

		test("should match Pokemon card snapshot", async ({ page }) => {
			await page.goto("/pokemons/1");
			await page.waitForSelector('[class*="Card"]', { timeout: 10000 });

			await page.waitForTimeout(1000);

			const card = page.locator('[class*="Card"]');
			await expect(card).toHaveScreenshot("pokemon-card-bulbasaur.png", {
				maxDiffPixels: 100,
			});
		});
	});

	test.describe("Responsive Design", () => {
		test("should match mobile view snapshot", async ({ page }) => {
			await page.setViewportSize({ width: 375, height: 667 });
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			await page.waitForTimeout(1000);

			await expect(page).toHaveScreenshot("pokemon-list-mobile.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});

		test("should match tablet view snapshot", async ({ page }) => {
			await page.setViewportSize({ width: 768, height: 1024 });
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			await page.waitForTimeout(1000);

			await expect(page).toHaveScreenshot("pokemon-list-tablet.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});

		test("should match desktop view snapshot", async ({ page }) => {
			await page.setViewportSize({ width: 1920, height: 1080 });
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			await page.waitForTimeout(1000);

			await expect(page).toHaveScreenshot("pokemon-list-desktop.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});
	});

	test.describe("Interactive States", () => {
		test("should match search results snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			const searchInput = page.getByTestId("search-input");
			await searchInput.fill("char");
			await page.waitForTimeout(500);

			await expect(page).toHaveScreenshot("search-results-char.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});

		test("should match no results state snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			const searchInput = page.getByTestId("search-input");
			await searchInput.fill("xyznonexistent");
			await page.waitForTimeout(500);

			await expect(page).toHaveScreenshot("search-no-results.png", {
				fullPage: true,
				maxDiffPixels: 50,
			});
		});

		test("should match pagination page 2 snapshot", async ({ page }) => {
			await page.goto("/pokemons");
			await page.waitForSelector('button:has-text("View Pokemon")', {
				timeout: 15000,
			});

			await page.getByRole("button", { name: "Next" }).click();
			await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

			await page.waitForTimeout(500);

			await expect(page).toHaveScreenshot("pokemon-list-page-2.png", {
				fullPage: true,
				maxDiffPixels: 100,
			});
		});
	});
});
