import { Button } from "@/components/ui/button";
import { GITHUB_REPO_URL } from "@/shared/constants/constants";
import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col p-4 w-full">
			<nav className="grid grid-cols-3 items-center w-full text-sm">
				<div className="flex flex-row gap-6 items-center justify-center col-start-2">
					<Link href={"/"}>Home</Link>
					<Link rel="noopener noreferrer" target="_blank" href={GITHUB_REPO_URL}>
						GitHub
					</Link>
				</div>

				<div className="flex flex-row items-center justify-end">
					<Button asChild>
						<Link href="/sign-in">Sign in</Link>
					</Button>
				</div>
			</nav>
		</div>
	);
}
