"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	useCreateNoteFormErrorStore,
	useCreateNoteFormStore,
} from "../stores/createNoteForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Id } from "@convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import {
	useEditNoteFormErrorStore,
	useEditNoteFormStore,
} from "../stores/editNoteForm";
import { useEffect } from "react";

type NoteFormProps = {
	mode: "create" | "edit";
	noteId: Id<"notes"> | null;
	notebookId: Id<"notebooks">;
};

function NoteForm({ mode, noteId, notebookId }: NoteFormProps) {
	const formTitle = mode === "create" ? "Create Note" : "Edit Note";
	const formDescription =
		mode === "create" ? "Create a new note" : "Edit this note";
	const submitButtonText = mode === "create" ? "Create note" : "Save changes";
	const submittingButtonText =
		mode === "create" ? "Creating..." : "Saving...";

	const createNoteFormStore = useCreateNoteFormStore();
	const editNoteFormStore = useEditNoteFormStore();

	const createNoteFormErrorStore = useCreateNoteFormErrorStore();
	const editNoteFormErrorStore = useEditNoteFormErrorStore();

	const noteFormStore =
		mode === "create" ? createNoteFormStore : editNoteFormStore;

	const noteFormErrorStore =
		mode === "create" ? createNoteFormErrorStore : editNoteFormErrorStore;

	const {
		isOpen,
		isSubmitting,
		title,
		description,
		startSubmitting,
		stopSubmitting,
		performFormCleanup,
		openForm,
		updateTitle,
		updateDescription,
	} = noteFormStore;

	const {
		title: titleErrors,
		description: descriptionErrors,
		updateTitleErrors,
		updateDescriptionErrors,
		clearAllErrors,
	} = noteFormErrorStore;

	const createNote = useMutation(api.notes.mutations.createNote);
	const editNote = useMutation(api.notes.mutations.editNote);

	const noteInfo = useQuery(
		api.notes.queries.retrieveNoteInfo,
		noteId
			? {
					noteId: noteId,
				}
			: "skip"
	);

	useEffect(() => {
		if (mode === "edit") {
			updateTitle(noteInfo?.title ?? "");
			updateDescription(noteInfo?.description ?? "");
		}
	}, [noteInfo, updateTitle, updateDescription]);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		startSubmitting();

		const trimmedTitle = title.trim();
		const trimmedDescription = description.trim();

		if (!trimmedTitle) return;

		try {
			let res: Awaited<ReturnType<typeof createNote>> | undefined;

			if (mode === "create") {
				res = await createNote({
					title: trimmedTitle,
					description: trimmedDescription,
					notebookId,
				});
			} else {
				if (!noteId) return;

				res = await editNote({
					noteId,
					title: trimmedTitle,
					description: trimmedDescription,
				});
			}

			if (!res?.success) {
				updateTitleErrors(res?.errors.title ?? []);
				updateDescriptionErrors(res?.errors.description ?? []);

				return;
			}

			performFormCleanup();
		} catch (error) {
			console.error(error);
		} finally {
			stopSubmitting();
		}
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (open) {
					openForm();
				} else {
					performFormCleanup();
					clearAllErrors();
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{formTitle}</DialogTitle>
					<DialogDescription>{formDescription}</DialogDescription>
				</DialogHeader>

				<form
					onSubmit={handleFormSubmit}
					className="flex flex-col gap-4"
				>
					<div className="flex flex-col gap-1">
						<Label htmlFor="title">Title</Label>
						<Input
							type="text"
							id="title"
							value={title}
							placeholder="Note title"
							onChange={(e) => updateTitle(e.target.value)}
							aria-invalid={titleErrors.length > 0}
							aria-describedby="note-title-errors"
						/>

						{titleErrors.length > 0 && (
							<div id="note-title-errors" className="flex flex-col gap-1">
								{titleErrors.map((error, index) => (
									<p
										key={index}
										className="text-red-700 text-sm"
									>
										{error}
									</p>
								))}
							</div>
						)}
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
							aria-invalid={descriptionErrors.length > 0}
							aria-describedby="note-description-errors"
						/>

						{descriptionErrors.length > 0 && (
							<div id="note-description-errors" className="flex flex-col gap-1">
								{descriptionErrors.map((error, index) => (
									<p
										key={index}
										className="text-red-700 text-sm"
									>
										{error}
									</p>
								))}
							</div>
						)}
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
