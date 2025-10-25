import {
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Id } from "@convex/_generated/dataModel";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useDeleteNoteAlertStore } from "../stores/deleteNoteAlert";
import DeleteNoteAlert from "./DeleteNoteAlert";

type NoteDropdownProps = {
	noteId: Id<"notes">;
};

function NoteDropdown({ noteId }: NoteDropdownProps) {
	const { openAlert, updateNoteId } = useDeleteNoteAlertStore();

	function handleDelete() {
		updateNoteId(noteId);
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
				<DropdownMenuItem>
					<PencilIcon />
					<span className="text-sm">Edit</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleDelete}>
					<Trash2Icon className="stroke-red-500" />
					<span className="text-sm text-red-500">Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>

			<DeleteNoteAlert noteId={noteId} />
		</>
	);
}

export default NoteDropdown;
