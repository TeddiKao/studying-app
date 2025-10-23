"use client";

import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { api } from "../../../../convex/_generated/api";

type NotebookDropdownProps = {
	notebookId: string;
};

function NotebookDropdown({ notebookId }: NotebookDropdownProps) {
	return (
		<DropdownMenuContent className="border-gray-300" side="right" sideOffset={8} align="start">
			<DropdownMenuItem>
                <PencilIcon />
                <span className="text-sm">Edit</span>
            </DropdownMenuItem>
			<DropdownMenuItem>
                <Trash2Icon className="stroke-red-500" />
                <span className="text-sm text-red-500">Delete</span>
            </DropdownMenuItem>
		</DropdownMenuContent>
	);
}

export default NotebookDropdown;
