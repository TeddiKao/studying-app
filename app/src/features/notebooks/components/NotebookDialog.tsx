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

type NotebookDialogProps = {
	mode: "create" | "edit";
};

function NotebookDialog({ mode }: NotebookDialogProps) {
	const formTitle =
		mode === "create" ? "Create a new notebook" : "Edit this notebook";
	const formDescription =
		mode === "create" ? "Create a new notebook" : "Edit this notebook";

	const createNotebookForm = useCreateNotebookFormStore();

	const name = createNotebookForm.name;
	const description = createNotebookForm.description;

    const updateName = createNotebookForm.updateName;
    const updateDescription = createNotebookForm.updateDescription;
    const clearName = createNotebookForm.clearName;
    const clearDescription = createNotebookForm.clearDescription;

	return (
		<Dialog>
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
							onChange={(e) => updateName(e.target.value)}
						/>
					</div>

                    <div className="flex flex-col gap-1">
						<Label htmlFor="name">Description</Label>
						<Input
							type="text"
							id="name"
							value={description}
							onChange={(e) => updateDescription(e.target.value)}
						/>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
