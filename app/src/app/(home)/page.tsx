import { Button } from "@/components/ui/button";
import { GITHUB_REPO_URL } from "@/shared/constants/constants";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col p-4 w-full">
			<nav className="flex flex-row items-center justify-between w-full text-sm">
				<div></div>
				
				<div className="flex flex-row gap-6 items-center">
					<Link href={"/"}>Home</Link>
					<Link rel="noopener noreferrer" target="_blank" href={GITHUB_REPO_URL}>
						GitHub
					</Link>
				</div>

				<div className="flex flex-row items-center">
					<Button asChild>
						<Link href="/sign-in">Sign in</Link>
					</Button>
				</div>
			</nav>
		</div>
	);
}
