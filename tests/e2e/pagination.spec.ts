import { test, expect } from "@playwright/test";

test.describe("Pagination", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/pokemons");
		await page.waitForSelector('button:has-text("View Pokemon")', {
			timeout: 15000,
		});
	});

	test("should show Page 1 initially", async ({ page }) => {
		await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
	});

	test("should navigate to next page when clicking Next", async ({ page }) => {
		const nextButton = page.getByRole("button", { name: "Next" });
		await expect(nextButton).toBeEnabled();
		await nextButton.click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();
	});

	test("should navigate back to previous page when clicking Previous", async ({
		page,
	}) => {
		const nextButton = page.getByRole("button", { name: "Next" });
		await nextButton.click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		const prevButton = page.getByRole("button", { name: "Previous" });
		await expect(prevButton).toBeEnabled();
		await prevButton.click();
		await expect(page.getByText(/Page 1 of \d+/)).toBeVisible();
	});

	test("should disable Previous button on first page", async ({ page }) => {
		await expect(
			page.getByRole("button", { name: "Previous" })
		).toBeDisabled();
	});

	test("should enable Previous button after navigating away from first page", async ({
		page,
	}) => {
		await page.getByRole("button", { name: "Next" }).click();
		await expect(
			page.getByRole("button", { name: "Previous" })
		).toBeEnabled();
	});

	test("should navigate through multiple pages", async ({ page }) => {
		const nextButton = page.getByRole("button", { name: "Next" });

		await nextButton.click();
		await expect(page.getByText(/Page 2 of \d+/)).toBeVisible();

		await nextButton.click();
		await expect(page.getByText(/Page 3 of \d+/)).toBeVisible();

		await nextButton.click();
		await expect(page.getByText(/Page 4 of \d+/)).toBeVisible();
	});

	test("should load different Pokemon on each page", async ({ page }) => {
		const getFirstCardName = async () => {
			const firstCard = page.locator('[class*="Card"]').first();
			const cardTitle = firstCard.locator('[class*="CardTitle"]');
			return cardTitle.textContent();
		};

		const firstPagePokemon = await getFirstCardName();

		await page.getByRole("button", { name: "Next" }).click();
		await page.waitForTimeout(500);

		const secondPagePokemon = await getFirstCardName();

		expect(firstPagePokemon).not.toEqual(secondPagePokemon);
	});

	test("should maintain pagination state during page transitions", async ({
		page,
	}) => {
		await page.getByRole("button", { name: "Next" }).click();
		await page.getByRole("button", { name: "Next" }).click();

		await expect(page.getByText(/Page 3 of \d+/)).toBeVisible();

		const prevButton = page.getByRole("button", { name: "Previous" });
		await expect(prevButton).toBeEnabled();

		const nextButton = page.getByRole("button", { name: "Next" });
		await expect(nextButton).toBeEnabled();
	});

	test("should show correct total page count", async ({ page }) => {
		const pageText = page.getByText(/Page \d+ of \d+/);
		const text = await pageText.textContent();
		const match = text?.match(/Page \d+ of (\d+)/);
		expect(match).toBeTruthy();
		const totalPages = Number.parseInt(match![1], 10);
		expect(totalPages).toBeGreaterThan(0);
	});
});
