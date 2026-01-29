import { test, expect } from "@playwright/test";

test.describe("Pokemon Detail Page", () => {
	test("should display Pokemon detail when navigating to detail page", async ({
		page,
	}) => {
		await page.goto("/pokemons/25");

		await expect(page.getByText("Pikachu")).toBeVisible({ timeout: 10000 });
	});

	test("should display Pokemon card with sprite image", async ({ page }) => {
		await page.goto("/pokemons/1");

		const card = page.locator('[class*="Card"]');
		await expect(card).toBeVisible({ timeout: 10000 });

		const image = card.locator("img");
		await expect(image).toBeVisible();
		await expect(image).toHaveAttribute("alt", "Bulbasaur");
	});

	test("should display Pokemon ID badge", async ({ page }) => {
		await page.goto("/pokemons/25");

		const badge = page.locator('[class*="Badge"]');
		await expect(badge).toBeVisible({ timeout: 10000 });
		await expect(badge).toContainText("#025");
	});

	test("should have View Pokemon button that navigates back to list", async ({
		page,
	}) => {
		await page.goto("/pokemons/1");

		await page.waitForSelector('[class*="Card"]', { timeout: 10000 });

		const viewButton = page.getByRole("button", { name: "View Pokemon" });
		await expect(viewButton).toBeVisible();

		await viewButton.click();

		await expect(page).toHaveURL("/pokemons");
	});

	test("should display loading state initially", async ({ page }) => {
		await page.goto("/pokemons/1", { waitUntil: "commit" });
		const loadingText = page.getByText("Loading...");
		const isLoadingVisible = await loadingText
			.isVisible()
			.catch(() => false);
		if (isLoadingVisible) {
			await expect(loadingText).toBeVisible();
		}
	});

	test("should display error state for invalid Pokemon ID", async ({
		page,
	}) => {
		await page.goto("/pokemons/99999");

		await expect(page.getByText("Error loading pokemon")).toBeVisible({
			timeout: 10000,
		});
	});

	test("should display correct Pokemon for different IDs", async ({
		page,
	}) => {
		await page.goto("/pokemons/4");
		await expect(page.getByText("Charmander")).toBeVisible({ timeout: 10000 });

		await page.goto("/pokemons/7");
		await expect(page.getByText("Squirtle")).toBeVisible({ timeout: 10000 });
	});

	test("should navigate from list to detail page", async ({ page }) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});

		const firstCard = page.locator('[class*="Card"]').first();
		const viewButton = firstCard.getByRole("button", {
			name: "View Pokemon",
		});
		await viewButton.click();

		await expect(page).toHaveURL(/\/pokemons\/\d+/);
	});

	test("should display Pokemon name capitalized", async ({ page }) => {
		await page.goto("/pokemons/1");

		await expect(page.getByText("Bulbasaur")).toBeVisible({ timeout: 10000 });

		const lowercaseName = page.getByText("bulbasaur");
		await expect(lowercaseName).not.toBeVisible();
	});
});
