import { GITHUB_REPO_URL } from "@/shared/constants/constants";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col p-6 w-full">
			<nav className="flex flex-row items-center justify-center w-full text-sm">
				<div className="flex flex-row gap-6">
					<Link href={"/"}>Home</Link>
					<Link target="_blank" href={GITHUB_REPO_URL}>
						GitHub
					</Link>
				</div>
			</nav>
		</div>
	);
}
