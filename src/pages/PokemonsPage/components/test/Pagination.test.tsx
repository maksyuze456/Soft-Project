import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Pagination } from "../Pagination";
import type { Table } from "@tanstack/react-table";

// Helper function to create a mock table with specific pagination state
function createMockTable(options: {
	pageIndex: number;
	pageCount: number;
	canPreviousPage: boolean;
	canNextPage: boolean;
}) {
	return {
		getCanPreviousPage: vi.fn(() => options.canPreviousPage),
		getCanNextPage: vi.fn(() => options.canNextPage),
		previousPage: vi.fn(),
		nextPage: vi.fn(),
		getState: vi.fn(() => ({
			pagination: {
				pageIndex: options.pageIndex,
				pageSize: 10,
			},
		})),
		getPageCount: vi.fn(() => options.pageCount),
	} as unknown as Table<unknown>;
}

describe("Pagination", () => {
	describe("rendering", () => {
		it("renders Previous and Next buttons", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(screen.getByRole("button", { name: "Previous" })).toBeInTheDocument();
			expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
		});

		it("renders page display with correct format", () => {
			const mockTable = createMockTable({
				pageIndex: 2,
				pageCount: 10,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(screen.getByText(/Page 3 of 10/)).toBeInTheDocument();
		});

		it("displays 1-indexed page number (pageIndex + 1)", () => {
			const mockTable = createMockTable({
				pageIndex: 0,
				pageCount: 5,
				canPreviousPage: false,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(screen.getByText(/Page 1 of 5/)).toBeInTheDocument();
		});
	});

	describe("Previous button states", () => {
		it("disables Previous button on first page", () => {
			const mockTable = createMockTable({
				pageIndex: 0,
				pageCount: 5,
				canPreviousPage: false,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			expect(previousButton).toBeDisabled();
		});

		it("enables Previous button when not on first page", () => {
			const mockTable = createMockTable({
				pageIndex: 2,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			expect(previousButton).not.toBeDisabled();
		});

		it("enables Previous button on last page", () => {
			const mockTable = createMockTable({
				pageIndex: 4,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: false,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			expect(previousButton).not.toBeDisabled();
		});
	});

	describe("Next button states", () => {
		it("disables Next button on last page", () => {
			const mockTable = createMockTable({
				pageIndex: 4,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: false,
			});

			render(<Pagination table={mockTable} />);

			const nextButton = screen.getByRole("button", { name: "Next" });
			expect(nextButton).toBeDisabled();
		});

		it("enables Next button when not on last page", () => {
			const mockTable = createMockTable({
				pageIndex: 2,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const nextButton = screen.getByRole("button", { name: "Next" });
			expect(nextButton).not.toBeDisabled();
		});

		it("enables Next button on first page", () => {
			const mockTable = createMockTable({
				pageIndex: 0,
				pageCount: 5,
				canPreviousPage: false,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const nextButton = screen.getByRole("button", { name: "Next" });
			expect(nextButton).not.toBeDisabled();
		});
	});

	describe("navigation callbacks", () => {
		it("calls previousPage when Previous button is clicked", () => {
			const mockTable = createMockTable({
				pageIndex: 2,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			fireEvent.click(previousButton);

			expect(mockTable.previousPage).toHaveBeenCalledTimes(1);
		});

		it("calls nextPage when Next button is clicked", () => {
			const mockTable = createMockTable({
				pageIndex: 2,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const nextButton = screen.getByRole("button", { name: "Next" });
			fireEvent.click(nextButton);

			expect(mockTable.nextPage).toHaveBeenCalledTimes(1);
		});

		it("does not call previousPage when Previous button is disabled", () => {
			const mockTable = createMockTable({
				pageIndex: 0,
				pageCount: 5,
				canPreviousPage: false,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			fireEvent.click(previousButton);

			expect(mockTable.previousPage).not.toHaveBeenCalled();
		});

		it("does not call nextPage when Next button is disabled", () => {
			const mockTable = createMockTable({
				pageIndex: 4,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: false,
			});

			render(<Pagination table={mockTable} />);

			const nextButton = screen.getByRole("button", { name: "Next" });
			fireEvent.click(nextButton);

			expect(mockTable.nextPage).not.toHaveBeenCalled();
		});

		it("calls navigation methods multiple times for multiple clicks", () => {
			const mockTable = createMockTable({
				pageIndex: 2,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			const nextButton = screen.getByRole("button", { name: "Next" });

			fireEvent.click(previousButton);
			fireEvent.click(previousButton);
			fireEvent.click(nextButton);
			fireEvent.click(nextButton);
			fireEvent.click(nextButton);

			expect(mockTable.previousPage).toHaveBeenCalledTimes(2);
			expect(mockTable.nextPage).toHaveBeenCalledTimes(3);
		});
	});

	describe("edge cases", () => {
		it("disables both buttons when there is only one page", () => {
			const mockTable = createMockTable({
				pageIndex: 0,
				pageCount: 1,
				canPreviousPage: false,
				canNextPage: false,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			const nextButton = screen.getByRole("button", { name: "Next" });

			expect(previousButton).toBeDisabled();
			expect(nextButton).toBeDisabled();
		});

		it("displays correct page info for single page", () => {
			const mockTable = createMockTable({
				pageIndex: 0,
				pageCount: 1,
				canPreviousPage: false,
				canNextPage: false,
			});

			render(<Pagination table={mockTable} />);

			expect(screen.getByText(/Page 1 of 1/)).toBeInTheDocument();
		});

		it("handles large page numbers correctly", () => {
			const mockTable = createMockTable({
				pageIndex: 99,
				pageCount: 100,
				canPreviousPage: true,
				canNextPage: false,
			});

			render(<Pagination table={mockTable} />);

			expect(screen.getByText(/Page 100 of 100/)).toBeInTheDocument();
		});

		it("handles very large page counts", () => {
			const mockTable = createMockTable({
				pageIndex: 500,
				pageCount: 1000,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(screen.getByText(/Page 501 of 1000/)).toBeInTheDocument();
		});
	});

	describe("styling", () => {
		it("has correct container classes", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			const { container } = render(<Pagination table={mockTable} />);

			const wrapper = container.firstChild;
			expect(wrapper).toHaveClass("mt-8", "flex", "items-center", "justify-center", "gap-4");
		});

		it("page display has correct text styling classes", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			const { container } = render(<Pagination table={mockTable} />);

			const pageSpan = container.querySelector("span");
			expect(pageSpan).toHaveClass("text-sm", "text-muted-foreground");
		});

		it("buttons have cursor-pointer class", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			const previousButton = screen.getByRole("button", { name: "Previous" });
			const nextButton = screen.getByRole("button", { name: "Next" });

			expect(previousButton).toHaveClass("cursor-pointer");
			expect(nextButton).toHaveClass("cursor-pointer");
		});
	});

	describe("table method calls", () => {
		it("calls getCanPreviousPage to determine Previous button state", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(mockTable.getCanPreviousPage).toHaveBeenCalled();
		});

		it("calls getCanNextPage to determine Next button state", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(mockTable.getCanNextPage).toHaveBeenCalled();
		});

		it("calls getState to get current pagination state", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(mockTable.getState).toHaveBeenCalled();
		});

		it("calls getPageCount to get total number of pages", () => {
			const mockTable = createMockTable({
				pageIndex: 1,
				pageCount: 5,
				canPreviousPage: true,
				canNextPage: true,
			});

			render(<Pagination table={mockTable} />);

			expect(mockTable.getPageCount).toHaveBeenCalled();
		});
	});
});
