import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCreateNoteFormStore } from "../stores/createNoteForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Id } from "@convex/_generated/dataModel";

type NoteFormProps = {
	mode: "create" | "edit";

	// @ts-ignore Functionality will be implemented later
	noteId: Id<"notes"> | null;
};

function NoteForm({ mode, noteId }: NoteFormProps) {
	const formTitle = mode === "create" ? "Create Note" : "Edit Note";
	const formDescription =
		mode === "create" ? "Create a new note" : "Edit this note";
	const submitButtonText = mode === "create" ? "Create" : "Save changes";
	const submittingButtonText =
		mode === "create" ? "Creating..." : "Saving...";

	const createNoteFormStore = useCreateNoteFormStore();

	const isOpen = createNoteFormStore.isOpen;
	const isSubmitting = createNoteFormStore.isSubmitting;
	const name = createNoteFormStore.name;
	const description = createNoteFormStore.description;

	const startSubmitting = createNoteFormStore.startSubmitting;
	const stopSubmitting = createNoteFormStore.stopSubmitting;
	const performFormCleanup = createNoteFormStore.performFormCleanup;

	const openForm = createNoteFormStore.openForm;
	const closeForm = createNoteFormStore.closeForm;

	const updateName = createNoteFormStore.updateName;
	const updateDescription = createNoteFormStore.updateDescription;

	const clearName = createNoteFormStore.clearName;
	const clearDescription = createNoteFormStore.clearDescription;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (open) {
					openForm();
				} else {
					performFormCleanup();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{formTitle}</DialogTitle>
					<DialogDescription>{formDescription}</DialogDescription>
				</DialogHeader>

				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							id="name"
							value={name}
							placeholder="Note name"
							onChange={(e) => updateName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<Label htmlFor="description">Description</Label>
						<Input
							type="text"
							id="description"
							value={description}
							placeholder="Note description"
							onChange={(e) => updateDescription(e.target.value)}
						/>
					</div>

					<DialogFooter className="w-full">
						{isSubmitting ? (
							<button
								type="submit"
								disabled={isSubmitting}
								aria-disabled={isSubmitting}
								className="flex flex-row gap-2 items-center justify-center bg-gray-950 text-white px-4 py-2 rounded-md w-full hover:cursor-pointer opacity-75"
							>
								<Spinner />
								<span>{submittingButtonText}</span>
							</button>
						) : (
							<button
								type="submit"
								disabled={isSubmitting}
								aria-disabled={isSubmitting}
								className="flex flex-row gap-2 items-center justify-center bg-gray-950 text-white px-4 py-2 rounded-md w-full hover:cursor-pointer"
							>
								<span>{submitButtonText}</span>
							</button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NoteForm;
