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
	useCreateNotebookFormErrorStore,
	useCreateNotebookFormStore,
} from "../stores/createNotebookForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { Spinner } from "@/components/ui/spinner";
import {
	useEditNotebookFormErrorStore,
	useEditNotebookFormStore,
} from "../stores/editNotebookForm";
import { useEffect } from "react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

type NotebookDialogProps = {
	mode: "create" | "edit";
	notebookId: Id<"notebooks"> | null;
};

function NotebookDialog({ mode, notebookId }: NotebookDialogProps) {
	const formTitle = mode === "create" ? "Create notebook" : "Edit notebook";
	const formDescription =
		mode === "create" ? "Create a new notebook" : "Edit this notebook";

	const submitButtonText = mode === "create" ? "Create" : "Save changes";
	const submittingButtonText =
		mode === "create" ? "Creating..." : "Saving...";

	const createNotebookForm = useCreateNotebookFormStore();
	const editNotebookForm = useEditNotebookFormStore();

	const createNotebookFormErrorStore = useCreateNotebookFormErrorStore();
	const editNotebookFormErrorStore = useEditNotebookFormErrorStore();

	const formStore = mode === "create" ? createNotebookForm : editNotebookForm;
	const errorStore =
		mode === "create"
			? createNotebookFormErrorStore
			: editNotebookFormErrorStore;

	const isOpen = formStore.isOpen;
	const isSubmitting = formStore.isSubmitting;
	const name = formStore.name;
	const description = formStore.description;

	const updateName = formStore.updateName;
	const updateDescription = formStore.updateDescription;
	const openForm = formStore.openForm;
	const startSubmitting = formStore.startSubmitting;
	const stopSubmitting = formStore.stopSubmitting;
	const performFormCleanup = formStore.performFormCleanup;

	const {
		name: nameErrors,
		description: descriptionErrors,
		updateNameErrors,
		updateDescriptionErrors,
	} = errorStore;

	const createNotebook = useMutation(api.notebooks.mutations.createNotebook);
	const editNotebook = useMutation(api.notebooks.mutations.editNotebook);
	const notebookInfo = useQuery(api.notebooks.queries.retrieveNotebookInfo, {
		notebookId: notebookId,
	});

	const { user } = useUser();

	useEffect(() => {
		if (mode === "edit") {
			updateName(notebookInfo?.name ?? "");
			updateDescription(notebookInfo?.description ?? "");
		}
	}, [updateName, updateDescription, notebookInfo]);

	async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!user || !user?.id) return;

		const trimmedName = name.trim();
		const trimmedDescription = description.trim();

		if (!trimmedName) return;

		startSubmitting();

		try {
			if (mode === "create") {
				const res = await createNotebook({
					name: trimmedName,
					description: trimmedDescription,
				});

				if (!res?.success) {
					return;
				}
			} else if (mode === "edit") {
				if (!notebookId) return;

				const res = await editNotebook({
					notebookId: notebookId,
					name: trimmedName,
					description: trimmedDescription,
				});

				if (!res?.success) {
					updateNameErrors(res?.errors.name ?? []);
					updateDescriptionErrors(res?.errors.description ?? []);
				}
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

						<div className="flex flex-col gap-1">
							{nameErrors.map((error) => (
								<p className="text-red-700">{error}</p>
							))}
						</div>
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

						<div className="flex flex-col gap-1">
							{descriptionErrors.map((error) => (
								<p className="text-red-700">{error}</p>
							))}
						</div>
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
								className="bg-gray-950 text-white px-4 py-2 rounded-md w-full hover:cursor-pointer"
							>
								{submitButtonText}
							</button>
						)}
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NotebookDialog;
