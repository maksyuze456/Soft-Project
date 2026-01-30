import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
	test("should navigate from home to pokemon list and view a pokemon detail", async ({
		page,
	}) => {
		// Start at root page
		await page.goto("/");
		await expect(
			page.getByRole("heading", { name: "Welcome to the Pokemon World" })
		).toBeVisible();

		// Click "Explore Pokemon" button
		await page.getByRole("link", { name: "Explore Pokemon" }).click();

		// Verify we're on the pokemon list page
		await expect(page).toHaveURL("/pokemons");
		await expect(page.getByRole("heading", { name: "Pokemons" })).toBeVisible({
			timeout: 30000,
		});

		// Wait for pokemon cards to load
		const viewButtons = page.getByRole("button", { name: "View Pokemon" });
		await expect(viewButtons.first()).toBeVisible({ timeout: 30000 });

		// Click the first "View Pokemon" button
		await viewButtons.first().click();

		// Verify we navigated to a pokemon detail page
		await expect(page).toHaveURL(/\/pokemons\/\d+/);

		// Verify the pokemon detail page shows stats (unique to detail page)
		await expect(page.getByText("Base Stats")).toBeVisible({ timeout: 30000 });
	});
});
