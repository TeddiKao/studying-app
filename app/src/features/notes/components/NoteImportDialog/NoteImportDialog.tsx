import { DialogHeader } from "@/components/ui/dialog";
import {
	DialogContent,
	DialogDescription,
	DialogTitle,
} from "@radix-ui/react-dialog";

function NoteImportDialog() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Import note</DialogTitle>
				<DialogDescription>
					Import a handwritten note. More options like uploading files
					and importing from third-party apps will be coming soon.
					soon.
				</DialogDescription>
			</DialogHeader>
		</DialogContent>
	);
}

export default NoteImportDialog;
