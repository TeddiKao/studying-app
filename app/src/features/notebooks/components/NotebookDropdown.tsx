"use client";

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useDeleteNotebookAlertStore } from "../stores/deleteNotebookAlert";
import DeleteNotebookAlert from "./DeleteNotebookAlert";
import { useEditNotebookFormStore } from "../stores/editNotebookForm";
import { Id } from "@convex/_generated/dataModel";

type NotebookDropdownProps = {
	notebookId: Id<"notebooks">;
};

function NotebookDropdown({ notebookId }: NotebookDropdownProps) {
	const { openAlert, updateNotebookId: updateAlertNotebookId } = useDeleteNotebookAlertStore();
	const { openForm, updateNotebookId } = useEditNotebookFormStore();

	function handleEdit() {
		updateNotebookId(notebookId);
		openForm();
	}

	function handleDelete() {
		updateAlertNotebookId(notebookId);
		openAlert();
	}

	return (
		<>
			<DropdownMenuContent
				className="border-gray-300"
				side="right"
				sideOffset={8}
				align="start"
			>
				<DropdownMenuItem onClick={handleEdit}>
					<PencilIcon />
					<span className="text-sm">Edit</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>
					<Trash2Icon className="stroke-red-500" />
					<span className="text-sm text-red-500">Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>

			<DeleteNotebookAlert />
		</>
	);
}

export default NotebookDropdown;
