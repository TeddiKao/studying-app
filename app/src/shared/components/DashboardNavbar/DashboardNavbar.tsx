import Link from "next/link";
import HomeIcon from "../icons/Home";
import NotebookIcon from "../icons/Notebook";
import ProfilePicture from "../ProfilePicture";
import NavIcon from "./components/NavIcon";

function DashboardNavbar() {
	return (
		<nav className="w-max flex flex-col gap-5 items-center bg-gray-100 h-screen py-3 px-4">
			<div className="flex flex-col">
				<ProfilePicture className="w-8 h-8 rounded-md bg-gray-950 hover:cursor-pointer" />
			</div>

			<div className="flex flex-col gap-5">
				<NavIcon tooltip="Home">
					<Link href="/dashboard">
						<HomeIcon className="fill-gray-950 w-6 h-6 hover:cursor-pointer" />
					</Link>
				</NavIcon>

				<NavIcon tooltip="Notebooks">
					<Link href="/notebooks">
						<NotebookIcon className="fill-gray-950 w-6 h-6 hover:cursor-pointer" />
					</Link>
				</NavIcon>
			</div>
		</nav>
	);
}

export default DashboardNavbar;
