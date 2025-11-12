import { GITHUB_REPO_URL } from "@/shared/constants/constants";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col p-4 w-full">
			<nav className="flex flex-row gap-6 items-center justify-center w-full">
				<Link href={"/"}>Home</Link>
				<Link target="_blank" href={GITHUB_REPO_URL}>GitHub</Link>
			</nav>
		</div>
	);
}
