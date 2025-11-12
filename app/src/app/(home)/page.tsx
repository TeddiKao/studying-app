import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col w-full">
			<nav className="flex flex-row items-center justify-center w-full">
				<Link href={"/"}>Home</Link>
			</nav>
		</div>
	);
}
