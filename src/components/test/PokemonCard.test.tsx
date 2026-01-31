import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PokemonCard } from "../PokemonCard";

const mockPokemon = {
	id: 25,
	name: "pikachu",
	url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
};

describe("PokemonCard", () => {
	describe("rendering", () => {
		it("renders the card with all elements", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			expect(screen.getByRole("img")).toBeInTheDocument();
			expect(screen.getByText("Pikachu")).toBeInTheDocument();
			expect(screen.getByText("#025")).toBeInTheDocument();
			expect(
				screen.getByRole("button", { name: "View Pokemon" }),
			).toBeInTheDocument();
		});

		it("renders the Pokemon image with correct src and alt attributes", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const image = screen.getByRole("img");
			expect(image).toHaveAttribute("src", mockPokemon.url);
			expect(image).toHaveAttribute("alt", "Pikachu");
		});
	});

	describe("name display", () => {
		it("capitalizes the first letter of the Pokemon name", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			expect(screen.getByText("Pikachu")).toBeInTheDocument();
			expect(screen.queryByText("pikachu")).not.toBeInTheDocument();
		});

		it("handles single character names", () => {
			const onAction = vi.fn();
			const singleCharPokemon = {
				id: 1,
				name: "a",
				url: "https://example.com/a.png",
			};
			render(<PokemonCard pokemon={singleCharPokemon} onAction={onAction} />);

			expect(screen.getByText("A")).toBeInTheDocument();
		});

		it("handles names with multiple words correctly", () => {
			const onAction = vi.fn();
			const multiWordPokemon = {
				id: 122,
				name: "mr-mime",
				url: "https://example.com/mr-mime.png",
			};
			render(<PokemonCard pokemon={multiWordPokemon} onAction={onAction} />);

			expect(screen.getByText("Mr-mime")).toBeInTheDocument();
		});
	});

	describe("ID badge rendering", () => {
		it("pads single digit IDs with zeros", () => {
			const onAction = vi.fn();
			const pokemon = {
				id: 1,
				name: "bulbasaur",
				url: "https://example.com/1.png",
			};
			render(<PokemonCard pokemon={pokemon} onAction={onAction} />);

			expect(screen.getByText("#001")).toBeInTheDocument();
		});

		it("pads double digit IDs with zeros", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			expect(screen.getByText("#025")).toBeInTheDocument();
		});

		it("displays triple digit IDs without padding", () => {
			const onAction = vi.fn();
			const pokemon = {
				id: 150,
				name: "mewtwo",
				url: "https://example.com/150.png",
			};
			render(<PokemonCard pokemon={pokemon} onAction={onAction} />);

			expect(screen.getByText("#150")).toBeInTheDocument();
		});

		it("handles IDs larger than 999", () => {
			const onAction = vi.fn();
			const pokemon = {
				id: 1000,
				name: "large-id",
				url: "https://example.com/1000.png",
			};
			render(<PokemonCard pokemon={pokemon} onAction={onAction} />);

			expect(screen.getByText("#1000")).toBeInTheDocument();
		});
	});

	describe("size variants", () => {
		it("renders with default size when size prop is not provided", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard pokemon={mockPokemon} onAction={onAction} />,
			);

			const image = screen.getByRole("img");
			expect(image).toHaveClass("h-48", "w-48");

			const cardContent = container.querySelector("[class*='p-6']");
			expect(cardContent).toBeInTheDocument();
		});

		it("renders with default size when size prop is explicitly set to default", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard
					pokemon={mockPokemon}
					onAction={onAction}
					size="default"
				/>,
			);

			const image = screen.getByRole("img");
			expect(image).toHaveClass("h-48", "w-48");

			const cardContent = container.querySelector("[class*='p-6']");
			expect(cardContent).toBeInTheDocument();
		});

		it("renders with md size when size prop is set to md", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard pokemon={mockPokemon} onAction={onAction} size="md" />,
			);

			const image = screen.getByRole("img");
			expect(image).toHaveClass("h-32", "w-32");

			const cardContent = container.querySelector("[class*='p-4']");
			expect(cardContent).toBeInTheDocument();
		});

		it("applies correct title styling for default size", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard
					pokemon={mockPokemon}
					onAction={onAction}
					size="default"
				/>,
			);

			const title = container.querySelector('[data-slot="card-title"]');
			expect(title).toHaveClass("text-xl");
		});

		it("applies correct title styling for md size", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard pokemon={mockPokemon} onAction={onAction} size="md" />,
			);

			const title = container.querySelector('[data-slot="card-title"]');
			expect(title).toHaveClass("text-base");
		});
	});

	describe("button interactions", () => {
		it("calls onAction when View Pokemon button is clicked", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const button = screen.getByRole("button", { name: "View Pokemon" });
			fireEvent.click(button);

			expect(onAction).toHaveBeenCalledTimes(1);
		});

		it("calls onAction multiple times for multiple clicks", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const button = screen.getByRole("button", { name: "View Pokemon" });
			fireEvent.click(button);
			fireEvent.click(button);
			fireEvent.click(button);

			expect(onAction).toHaveBeenCalledTimes(3);
		});
	});

	describe("image attributes and accessibility", () => {
		it("has correct alt text derived from capitalized Pokemon name", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const image = screen.getByRole("img");
			expect(image).toHaveAttribute("alt", "Pikachu");
		});

		it("image has object-contain class for proper aspect ratio", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const image = screen.getByRole("img");
			expect(image).toHaveClass("object-contain");
		});

		it("image has drop-shadow for visual effect", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const image = screen.getByRole("img");
			expect(image).toHaveClass("drop-shadow-lg");
		});

		it("image has hover scale transition class", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const image = screen.getByRole("img");
			expect(image).toHaveClass("group-hover:scale-110");
		});
	});

	describe("card structure", () => {
		it("has correct card wrapper classes for hover effect", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard pokemon={mockPokemon} onAction={onAction} />,
			);

			const card = container.firstChild;
			expect(card).toHaveClass("group", "hover:shadow-lg");
		});

		it("renders button with full width", () => {
			const onAction = vi.fn();
			render(<PokemonCard pokemon={mockPokemon} onAction={onAction} />);

			const button = screen.getByRole("button", { name: "View Pokemon" });
			expect(button).toHaveClass("w-full");
		});

		it("renders badge with proper positioning classes", () => {
			const onAction = vi.fn();
			const { container } = render(
				<PokemonCard pokemon={mockPokemon} onAction={onAction} />,
			);

			const badge = container.querySelector(
				"[class*='absolute'][class*='top-3'][class*='right-3']",
			);
			expect(badge).toBeInTheDocument();
			expect(badge).toHaveTextContent("#025");
		});
	});

	describe("props validation", () => {
		it("renders correctly with minimum required props", () => {
			const onAction = vi.fn();
			const minimalPokemon = {
				id: 1,
				name: "test",
				url: "https://example.com/test.png",
			};
			render(<PokemonCard pokemon={minimalPokemon} onAction={onAction} />);

			expect(screen.getByText("Test")).toBeInTheDocument();
			expect(screen.getByText("#001")).toBeInTheDocument();
			expect(screen.getByRole("img")).toHaveAttribute(
				"src",
				"https://example.com/test.png",
			);
		});

		it("handles empty string name gracefully", () => {
			const onAction = vi.fn();
			const emptyNamePokemon = {
				id: 1,
				name: "",
				url: "https://example.com/test.png",
			};
			const { container } = render(
				<PokemonCard pokemon={emptyNamePokemon} onAction={onAction} />,
			);

			const image = container.querySelector("img");
			expect(image).toHaveAttribute("alt", "");
		});

		it("handles zero ID correctly", () => {
			const onAction = vi.fn();
			const zeroIdPokemon = {
				id: 0,
				name: "test",
				url: "https://example.com/test.png",
			};
			render(<PokemonCard pokemon={zeroIdPokemon} onAction={onAction} />);

			expect(screen.getByText("#000")).toBeInTheDocument();
		});
	});
});
