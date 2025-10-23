"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

type NotebookDialogProps = {
	mode: "create" | "edit";
};

function NotebookDialog({ mode }: NotebookDialogProps) {
	const formTitle = mode === "create" ? "Create notebook" : "Edit notebook";
	const formDescription =
		mode === "create" ? "Create a new notebook" : "Edit this notebook";
	const submitButtonText = mode === "create" ? "Create" : "Save changes";

	const createNotebookForm = useCreateNotebookFormStore();

	const isOpen = createNotebookForm.isOpen;
	const isSubmitting = createNotebookForm.isSubmitting;
	const name = createNotebookForm.name;
	const description = createNotebookForm.description;

	const updateName = createNotebookForm.updateName;
	const updateDescription = createNotebookForm.updateDescription;
	const clearName = createNotebookForm.clearName;
	const clearDescription = createNotebookForm.clearDescription;
	const openForm = createNotebookForm.openForm;
	const closeForm = createNotebookForm.closeForm;
	const startSubmitting = createNotebookForm.startSubmitting;
	const stopSubmitting = createNotebookForm.stopSubmitting;

	const createNotebook = useMutation(api.notebooks.mutations.createNotebook);
	const { user } = useUser();

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!user || !user?.id) return;

		const trimmedName = name.trim();

		if (!trimmedName) return;

		try {
			if (mode === "create") {
				await createNotebook({
					name,
					description,
					ownerId: user.id,
				});

				closeForm();
				clearName();
				clearDescription();
			}
		} catch (error) {
			console.error(error);
		}

		console.log("Form submitted");
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open: boolean) => {
				if (open) {
					openForm();
				} else {
					closeForm();
					clearName();
					clearDescription();
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
						<Label htmlFor="name">Name</Label>
						<Input
							type="text"
							id="name"
							value={name}
							placeholder="Notebook name"
							onChange={(e) => updateName(e.target.value)}
						/>
					</div>

					<div className="flex flex-col gap-1">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							value={description}
							placeholder="Notebook description"
							onChange={(e) => updateDescription(e.target.value)}
							className="resize-none"
							rows={4}
						/>
					</div>

					<DialogFooter className="w-full">
						<button
							type="submit"
							disabled={isSubmitting}
							aria-disabled={isSubmitting}
							className="bg-gray-950 text-white px-4 py-2 rounded-md w-full hover:cursor-pointer"
						>
							{submitButtonText}
						</button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NotebookDialog;
