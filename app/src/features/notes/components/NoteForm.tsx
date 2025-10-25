"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type NoteFormProps = {
	mode: "create" | "edit";

	// @ts-ignore Functionality will be implemented later
	noteId: Id<"notes"> | null;
};

function NoteForm({ mode, noteId }: NoteFormProps) {
	const formTitle = mode === "create" ? "Create Note" : "Edit Note";
	const formDescription =
		mode === "create" ? "Create a new note" : "Edit this note";
	const submitButtonText = mode === "create" ? "Create note" : "Save changes";
	const submittingButtonText =
		mode === "create" ? "Creating..." : "Saving...";

	const createNoteFormStore = useCreateNoteFormStore();
	const noteFormStore =
		mode === "create" ? createNoteFormStore : createNoteFormStore;

	const {
		isOpen,
		isSubmitting,
		name,
		description,
		startSubmitting,
		stopSubmitting,
		performFormCleanup,
		openForm,
		closeForm,
		updateName,
		updateDescription,
		clearName,
		clearDescription,
	} = noteFormStore;
	
	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		startSubmitting();
	}

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
						<Textarea
							id="description"
							value={description}
							placeholder="Note description"
							onChange={(e) => updateDescription(e.target.value)}
							rows={4}
							className="resize-none"
						/>
					</div>

					<DialogFooter className="w-full">
						{isSubmitting ? (
							<Button
								type="submit"
								disabled={isSubmitting}
								aria-disabled={isSubmitting}
								className="flex flex-row gap-2 items-center justify-center hover:cursor-pointer opacity-75 w-full"
							>
								<Spinner />
								<span>{submittingButtonText}</span>
							</Button>
						) : (
							<Button
								type="submit"
								disabled={isSubmitting}
								aria-disabled={isSubmitting}
								className="flex flex-row gap-2 items-center justify-center hover:cursor-pointer w-full"
							>
								<span>{submitButtonText}</span>
							</Button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NoteForm;
