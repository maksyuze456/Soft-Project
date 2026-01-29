import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
	test("should navigate from home to Pokemon list", async ({ page }) => {
		await page.goto("/");

		await page.goto("/pokemons");
		await expect(page).toHaveURL("/pokemons");
		await expect(page.getByRole("heading", { name: "Pokemon" })).toBeVisible({
			timeout: 10000,
		});
	});

	test("should navigate to Pokemon detail and back to list", async ({
		page,
	}) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});

		const firstCard = page.locator('[class*="Card"]').first();
		await firstCard.getByRole("button", { name: "View Pokemon" }).click();

		await expect(page).toHaveURL(/\/pokemons\/\d+/);

		const viewButton = page.getByRole("button", { name: "View Pokemon" });
		await expect(viewButton).toBeVisible({ timeout: 10000 });
		await viewButton.click();

		await expect(page).toHaveURL("/pokemons");
	});

	test("should maintain list state after viewing detail", async ({ page }) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});

		await page.getByRole("button", { name: "Next" }).click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		const firstCard = page.locator('[class*="Card"]').first();
		const firstPokemonName = await firstCard
			.locator('[class*="CardTitle"]')
			.textContent();

		await firstCard.getByRole("button", { name: "View Pokemon" }).click();
		await expect(page).toHaveURL(/\/pokemons\/\d+/);

		await page.goBack();
		await expect(page).toHaveURL("/pokemons");
	});

	test("should handle direct URL navigation to Pokemon detail", async ({
		page,
	}) => {
		await page.goto("/pokemons/150");

		await expect(page.getByText("Mewtwo")).toBeVisible({ timeout: 10000 });
	});

	test("should handle browser back/forward navigation", async ({ page }) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});

		const firstCard = page.locator('[class*="Card"]').first();
		await firstCard.getByRole("button", { name: "View Pokemon" }).click();

		await expect(page).toHaveURL(/\/pokemons\/\d+/);

		await page.goBack();
		await expect(page).toHaveURL("/pokemons");

		await page.goForward();
		await expect(page).toHaveURL(/\/pokemons\/\d+/);
	});

	test("should navigate through pagination and back", async ({ page }) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});

		await page.getByRole("button", { name: "Next" }).click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		await page.getByRole("button", { name: "Next" }).click();
		await expect(page.getByText(/Page 3 of \d+/)).toBeVisible();

		await page.getByRole("button", { name: "Previous" }).click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		await page.getByRole("button", { name: "Previous" }).click();
		await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
	});

	test("should complete full user journey: browse, search, view detail", async ({
		page,
	}) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});

		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("char");
		await page.waitForTimeout(500);

		const searchResults = page.getByRole("button", { name: "View Pokemon" });
		const searchResultCount = await searchResults.count();
		expect(searchResultCount).toBeGreaterThan(0);

		const firstCard = page.locator('[class*="Card"]').first();
		await firstCard.getByRole("button", { name: "View Pokemon" }).click();

		await expect(page).toHaveURL(/\/pokemons\/\d+/);

		const pokemonName = page.locator('[class*="CardTitle"]');
		await expect(pokemonName).toBeVisible();

		await page.getByRole("button", { name: "View Pokemon" }).click();
		await expect(page).toHaveURL("/pokemons");
	});
});
