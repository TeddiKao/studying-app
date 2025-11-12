import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col p-4 w-full">
			<nav className="flex flex-row gap-6 items-center justify-center w-full">
				<Link href={"/"}>Home</Link>
				<Link href={"/"}>GitHub</Link>
			</nav>
		</div>
	);
}
