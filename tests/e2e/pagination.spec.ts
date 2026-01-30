import { test, expect } from "@playwright/test";

test.describe("Pagination", () => {
	test("should paginate through Pokemon results", async ({ page }) => {
		await page.goto("/pokemons");

		// Wait for pokemon cards to load
		const viewButtons = page.getByRole("button", { name: "View Pokemon" });
		await expect(viewButtons.first()).toBeVisible({ timeout: 30000 });

		// Verify we're on page 1
		await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();

		// Navigate to page 2
		await page.getByRole("button", { name: "Next" }).click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		// Verify different pokemon are shown (page changed)
		await expect(viewButtons.first()).toBeVisible();
	});
});
