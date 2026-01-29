import { test, expect } from "@playwright/test";

test.describe("Search Functionality", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});
	});

	test("should have a search input with placeholder", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		await expect(searchInput).toBeVisible();
		await expect(searchInput).toHaveAttribute(
			"placeholder",
			"Search Pokemon by name..."
		);
	});

	test("should filter Pokemon when searching", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("pika");

		await page.waitForTimeout(500);

		const cards = page.getByRole("button", { name: "View Pokemon" });
		const cardCount = await cards.count();
		expect(cardCount).toBeGreaterThan(0);
		expect(cardCount).toBeLessThan(20);
	});

	test("should show clear button when search has value", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		const clearButton = page.getByTestId("clear-search");

		await expect(clearButton).not.toBeVisible();

		await searchInput.fill("bulbasaur");

		await expect(clearButton).toBeVisible();
	});

	test("should clear search when clicking clear button", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("bulbasaur");

		await page.waitForTimeout(500);

		const clearButton = page.getByTestId("clear-search");
		await clearButton.click();

		await expect(searchInput).toHaveValue("");
	});

	test("should show no results message for non-existent Pokemon", async ({
		page,
	}) => {
		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("xyznonexistent");

		await page.waitForTimeout(500);

		await expect(
			page.getByText(/No Pokemon found for "xyznonexistent"/)
		).toBeVisible();
	});

	test("should reset pagination when searching", async ({ page }) => {
		await page.getByRole("button", { name: "Next" }).click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("char");

		await page.waitForTimeout(500);

		await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
	});

	test("should restore full list when clearing search", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("pika");
		await page.waitForTimeout(500);

		const filteredCount = await page
			.getByRole("button", { name: "View Pokemon" })
			.count();

		const clearButton = page.getByTestId("clear-search");
		await clearButton.click();
		await page.waitForTimeout(500);

		const fullListCount = await page
			.getByRole("button", { name: "View Pokemon" })
			.count();
		expect(fullListCount).toBeGreaterThan(filteredCount);
		expect(fullListCount).toBe(20);
	});

	test("should search be case insensitive", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");

		await searchInput.fill("PIKA");
		await page.waitForTimeout(500);
		const upperCaseResults = await page
			.getByRole("button", { name: "View Pokemon" })
			.count();

		await searchInput.fill("pika");
		await page.waitForTimeout(500);
		const lowerCaseResults = await page
			.getByRole("button", { name: "View Pokemon" })
			.count();

		expect(upperCaseResults).toBe(lowerCaseResults);
	});

	test("should debounce search input", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");

		await searchInput.fill("p");
		await searchInput.fill("pi");
		await searchInput.fill("pik");
		await searchInput.fill("pika");

		await page.waitForTimeout(400);

		const cards = page.getByRole("button", { name: "View Pokemon" });
		await expect(cards.first()).toBeVisible();
	});

	test("should find specific Pokemon by exact name", async ({ page }) => {
		const searchInput = page.getByTestId("search-input");
		await searchInput.fill("bulbasaur");

		await page.waitForTimeout(500);

		const pageText = page.locator("text=Bulbasaur");
		await expect(pageText.first()).toBeVisible();
	});
});
