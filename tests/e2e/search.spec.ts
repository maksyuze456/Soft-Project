import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
	test("should filter Pokemon when searching by name", async ({ page }) => {
		await page.goto("/pokemons");

		// Wait for pokemon cards to load
		const viewButtons = page.getByRole("button", { name: "View Pokemon" });
		await expect(viewButtons.first()).toBeVisible({ timeout: 30000 });

		// Count initial cards (should be more than 1)
		const initialCount = await viewButtons.count();
		expect(initialCount).toBeGreaterThan(1);

		// Search for a specific pokemon
		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("pika");

		// Wait for Pikachu to appear in search results
		await expect(page.getByRole("img", { name: "Pikachu" })).toBeVisible({
			timeout: 30000,
		});

		// Verify search filtered the results
		const filteredCount = await viewButtons.count();
		expect(filteredCount).toBeGreaterThan(0);
		expect(filteredCount).toBeLessThan(initialCount);
	});
});
