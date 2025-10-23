"use client";

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useDeleteNotebookAlertStore } from "../stores/deleteNotebookAlert";
import DeleteNotebookAlert from "./DeleteNotebookAlert";

type NotebookDropdownProps = {
	notebookId: Id<"notebooks">;
};

function NotebookDropdown({ notebookId }: NotebookDropdownProps) {
	const { openAlert } = useDeleteNotebookAlertStore();

	return (
		<>
			<DropdownMenuContent
				className="border-gray-300"
				side="right"
				sideOffset={8}
				align="start"
			>
				<DropdownMenuItem>
					<PencilIcon />
					<span className="text-sm">Edit</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={openAlert}>
					<Trash2Icon className="stroke-red-500" />
					<span className="text-sm text-red-500">Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>

			<DeleteNotebookAlert notebookId={notebookId} />
		</>
	);
}

export default NotebookDropdown;
