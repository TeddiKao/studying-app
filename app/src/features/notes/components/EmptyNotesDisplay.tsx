import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { useCreateNoteFormStore } from "../stores/createNoteForm";
import NoteIcon from "@/shared/components/icons/Note";

function EmptyNotesDisplay() {
	const { openForm } = useCreateNoteFormStore();

	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<NoteIcon className="stroke-gray-950" />
				</EmptyMedia>
				<EmptyTitle>No notes yet</EmptyTitle>
				<EmptyDescription>
					You do not have any notes yet. Get started by creating one.
				</EmptyDescription>
			</EmptyHeader>

			<EmptyContent>
				<div className="flex flex-row gap-2">
					<Button
						onClick={openForm}
						className="hover:cursor-pointer"
						type="button"
					>
						Create notes
					</Button>
				</div>
			</EmptyContent>
		</Empty>
	);
}

export default EmptyNotesDisplay;
