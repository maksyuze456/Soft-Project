import { useRouter } from "@tanstack/react-router";

export function BackButton() {
	const router = useRouter();

	return (
		<button
			type="button"
			onClick={() => router.history.back()}
			className="self-start rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-gray-100"
			aria-label="Go back"
		>
			<svg
				className="h-5 w-5 text-gray-600"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
		</button>
	);
}
