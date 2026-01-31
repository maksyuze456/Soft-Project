import { Link, useRouterState } from "@tanstack/react-router";

export function Header() {
	const routerState = useRouterState();
	const currentPath = routerState.location.pathname;

	const isActive = (path: string) => {
		if (path === "/") {
			return currentPath === "/";
		}
		return currentPath.startsWith(path);
	};

	return (
		<header className="sticky top-0 z-50 w-full bg-gray-100 py-4">
			<nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full bg-white px-8 py-3 shadow-sm">
				{/* Left navigation */}
				<div className="flex items-center gap-8">
					<Link
						to="/"
						className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
							isActive("/")
								? "text-gray-900"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						<HomeIcon />
						<span>Home</span>
						{isActive("/") && (
							<span className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-full bg-red-500" />
						)}
					</Link>

					<Link
						to="/pokemons"
						className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
							isActive("/pokemons")
								? "text-gray-900"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						<PokeballIcon />
						<span>Pokemons</span>
						{isActive("/pokemons") && (
							<span className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-full bg-red-500" />
						)}
					</Link>
				</div>

				{/* Right navigation */}
				<div className="flex items-center">
					<Link
						onClick={() => {
							throw new Error("Error in header");
						}}
						to="/about"
						className={`relative flex items-center gap-2 text-sm font-medium transition-colors ${
							isActive("/about")
								? "text-gray-900"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						<InfoIcon />
						<span>About Us</span>
						{isActive("/about") && (
							<span className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-full bg-red-500" />
						)}
					</Link>
				</div>
			</nav>
		</header>
	);
}

function HomeIcon() {
	return (
		<svg
			className="h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
			/>
		</svg>
	);
}

function PokeballIcon() {
	return (
		<svg
			className="h-5 w-5"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="10" strokeWidth={2} />
			<path d="M2 12h20" strokeWidth={2} />
			<circle cx="12" cy="12" r="3" strokeWidth={2} />
		</svg>
	);
}

function InfoIcon() {
	return (
		<svg
			className="h-5 w-5"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
	);
}
