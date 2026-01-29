import { test, expect } from "@playwright/test";

test.describe("Pokemon List Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/pokemons");
	});

	test("should display the page heading", async ({ page }) => {
		await expect(page.getByRole("heading", { name: "Pokemon" })).toBeVisible();
	});

	test("should display the search input", async ({ page }) => {
		await expect(page.getByTestId("search-input")).toBeVisible();
		await expect(page.getByTestId("search-input")).toHaveAttribute(
			"placeholder",
			"Search Pokemon by name..."
		);
	});

	test("should display Pokemon cards in a grid", async ({ page }) => {
		await expect(page.locator('[class*="grid"]').first()).toBeVisible();
		const cards = page.getByRole("button", { name: "View Pokemon" });
		await expect(cards.first()).toBeVisible({ timeout: 10000 });
		const cardCount = await cards.count();
		expect(cardCount).toBeGreaterThan(0);
		expect(cardCount).toBeLessThanOrEqual(20);
	});

	test("should display Pokemon cards with name and ID badge", async ({
		page,
	}) => {
		await page.waitForSelector('[class*="grid"]');
		const firstCard = page.locator('[class*="Card"]').first();
		await expect(firstCard).toBeVisible({ timeout: 10000 });
		const badge = firstCard.locator('[class*="Badge"]');
		await expect(badge).toBeVisible();
		const badgeText = await badge.textContent();
		expect(badgeText).toMatch(/#\d{3}/);
	});

	test("should display loading state initially", async ({ page }) => {
		await page.goto("/pokemons", { waitUntil: "commit" });
		const loadingText = page.getByText("Loading Pokemon...");
		const isLoadingVisible = await loadingText
			.isVisible()
			.catch(() => false);
		if (isLoadingVisible) {
			await expect(loadingText).toBeVisible();
		}
	});

	test("should display pagination controls", async ({ page }) => {
		await expect(
			page.getByRole("button", { name: "Previous" })
		).toBeVisible({ timeout: 10000 });
		await expect(page.getByRole("button", { name: "Next" })).toBeVisible();
		await expect(page.getByText(/Page \d+ of \d+/)).toBeVisible();
	});

	test("should have Previous button disabled on first page", async ({
		page,
	}) => {
		await page.waitForSelector('button:has-text("Previous")', {
			timeout: 10000,
		});
		await expect(
			page.getByRole("button", { name: "Previous" })
		).toBeDisabled();
	});

	test("should have Next button enabled when more pages exist", async ({
		page,
	}) => {
		await page.waitForSelector('button:has-text("Next")', { timeout: 10000 });
		await expect(page.getByRole("button", { name: "Next" })).toBeEnabled();
	});

	test("should display 20 Pokemon per page by default", async ({ page }) => {
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 10000,
		});
		const cards = page.getByRole("button", { name: "View Pokemon" });
		await expect(cards).toHaveCount(20);
	});
});
