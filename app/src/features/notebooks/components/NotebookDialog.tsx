"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useCreateNotebookFormStore } from "../stores/createNotebookForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type NotebookDialogProps = {
	mode: "create" | "edit";
};

function NotebookDialog({ mode }: NotebookDialogProps) {
	const formTitle =
		mode === "create" ? "Create notebook" : "Edit notebook";
	const formDescription =
		mode === "create" ? "Create a new notebook" : "Edit this notebook";
	const submitButtonText = mode === "create" ? "Create" : "Save changes";

	const createNotebookForm = useCreateNotebookFormStore();

	const isOpen = createNotebookForm.isOpen;
	const name = createNotebookForm.name;
	const description = createNotebookForm.description;

	const updateName = createNotebookForm.updateName;
	const updateDescription = createNotebookForm.updateDescription;
	const clearName = createNotebookForm.clearName;
	const clearDescription = createNotebookForm.clearDescription;
	const openForm = createNotebookForm.openForm;
	const closeForm = createNotebookForm.closeForm;

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
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

				<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
						<Label htmlFor="name">Description</Label>
						<Textarea
							id="name"
							value={description}
							placeholder="Notebook description"
							onChange={(e) => updateDescription(e.target.value)}
							className="resize-none"
							rows={4}
						/>
					</div>

					<button type="submit" className="bg-gray-950 text-white px-4 py-2 rounded-md hover:cursor-pointer">
						{submitButtonText}
					</button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NotebookDialog;
