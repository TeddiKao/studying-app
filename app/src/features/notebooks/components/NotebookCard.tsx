"use client";

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotebookIcon from "@/shared/components/icons/Notebook";
import { EllipsisVertical } from "lucide-react";
import NotebookDropdown from "./NotebookDropdown";
import { useNotebookDropdownStore } from "../stores/notebookDropdown";
import { Id } from "@convex/_generated/dataModel";
import { useRouter } from "next/router";

type NotebookCardProps = {
	name: string;
	notesCount: number;
	notebookId: Id<"notebooks">;
};

function NotebookCard({ name, notesCount, notebookId }: NotebookCardProps) {
	const noun = notesCount === 1 ? "note" : "notes";

	const {
		activeNotebookDropdownId,
		updateActiveNotebookDropdownId,
		clearActiveNotebookDropdownId,
	} = useNotebookDropdownStore();
	
	const router = useRouter();

	const isOpen = activeNotebookDropdownId === notebookId;


	return (
		<div className="flex flex-row items-center bg-gray-50 rounded-md shadow-md p-2">
			<button
				type="button"
				aria-label={`Open notebook ${name}`}
				onClick={() => router.push(`/notebooks/${notebookId}`)}
				className="flex flex-row gap-2 items-center hover:cursor-pointer grow"
			>
				<NotebookIcon className="w-6 h-6 fill-gray-500" />
				<span className="flex flex-col gap-0.5">
					<span className="text-lg font-semibold text-left">
						{name}
					</span>
					<span className="text-sm text-gray-500 text-left">
						{notesCount} {noun}
					</span>
				</span>
			</button>

			<DropdownMenu
				open={isOpen}
				onOpenChange={(open) => {
					if (open) {
						updateActiveNotebookDropdownId(notebookId);
					} else {
						clearActiveNotebookDropdownId();
					}
				}}
			>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						aria-label={`Options for ${name}`}
						className="hover:cursor-pointer hover:bg-gray-300 rounded-md py-1"
					>
						<EllipsisVertical className="stroke-gray-500" />
					</button>
				</DropdownMenuTrigger>

				<NotebookDropdown notebookId={notebookId} />
			</DropdownMenu>
		</div>
	);
}

export default NotebookCard;
