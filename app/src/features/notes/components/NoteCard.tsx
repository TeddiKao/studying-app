"use client";

import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NoteIcon from "@/shared/components/icons/Note";
import { EllipsisVertical } from "lucide-react";
import NoteDropdown from "./NoteDropdown";
import { useNoteDropdownStore } from "../stores/noteDropdown";
import { Id } from "@convex/_generated/dataModel";
import { useRouter } from "next/navigation";

type NoteCardProps = {
	noteName: string;
	noteId: Id<"notes">;
	notebookId: Id<"notebooks">;
};

function NoteCard({ noteName, noteId, notebookId }: NoteCardProps) {
	const {
		activeNoteDropdownId,
		updateActiveNoteDropdownId,
		clearActiveNoteDropdownId,
	} = useNoteDropdownStore();

	const router = useRouter();

	function handleNoteCardClick() {
		router.push(`/notebooks/${notebookId}/${noteId}`);
	}

	return (
		<div className="flex flex-row items-center bg-gray-50 rounded-md shadow-md p-2">
			<button
				type="button"
				aria-label={`Open note ${noteName}`}
				onClick={handleNoteCardClick}
				className="flex flex-row gap-2 items-center hover:cursor-pointer grow"
			>
				<NoteIcon className="w-6 h-6 stroke-gray-500" />
				<span className="flex flex-col gap-0.5 text-left">
					<span className="text-lg font-semibold text-left">
						{noteName}
					</span>
				</span>
			</button>

			<DropdownMenu
				open={activeNoteDropdownId === noteId}
				onOpenChange={(open) => {
					if (open) {
						updateActiveNoteDropdownId(noteId);
					} else {
						clearActiveNoteDropdownId();
					}
				}}
			>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						aria-label={`Options for note ${noteName}`}
						className="hover:cursor-pointer hover:bg-gray-300 rounded-md py-1"
					>
						<EllipsisVertical className="stroke-gray-500" />
					</button>
				</DropdownMenuTrigger>

				<NoteDropdown noteId={noteId} />
			</DropdownMenu>
		</div>
	);
}

export default NoteCard;
