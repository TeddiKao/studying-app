"use client";

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type NotebookDropdownProps = {
	notebookId: Id<"notebooks">;
};

function NotebookDropdown({ notebookId }: NotebookDropdownProps) {
	const deleteNotebook = useMutation(api.notebooks.mutations.deleteNotebook);

	return (
		<DropdownMenuContent className="border-gray-300" side="right" sideOffset={8} align="start">
			<DropdownMenuItem>
                <PencilIcon />
                <span className="text-sm">Edit</span>
            </DropdownMenuItem>
			<DropdownMenuItem onClick={() => deleteNotebook({ notebookId: notebookId })}>
                <Trash2Icon className="stroke-red-500" />
                <span className="text-sm text-red-500">Delete</span>
            </DropdownMenuItem>
		</DropdownMenuContent>
	);
}

export default NotebookDropdown;
