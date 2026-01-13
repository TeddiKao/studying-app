import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	useNoteImportInfoFormErrorStore,
	useNoteImportInfoFormStore,
} from "@/features/notes/stores/noteImportInfoForm";

function NoteInfoScreen() {
	const {
		isOpen,
		openForm,
		closeForm,
		title,
		updateTitle,
		clearTitle,
		description,
		updateDescription,
		clearDescription,
		isSubmitting,
		startSubmitting,
		stopSubmitting,

		performFormCleanup,
	} = useNoteImportInfoFormStore();

	const {
		title: titleErrors,
		updateTitleErrors,
		clearTitleErrors,

		description: descriptionErrors,
		updateDescriptionErrors,
		clearDescriptionErrors,

		clearAllErrors,
	} = useNoteImportInfoFormErrorStore();

	function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

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
				<DialogTitle>Enter note information</DialogTitle>
				<DialogDescription>
					Enter information about the imported note here
				</DialogDescription>
			</DialogHeader>

			<form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
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
						<div
							id="note-title-errors"
							className="flex flex-col gap-1"
						>
							{titleErrors.map((error, index) => (
								<p key={index} className="text-red-700 text-sm">
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
						<div
							id="note-description-errors"
							className="flex flex-col gap-1"
						>
							{descriptionErrors.map((error, index) => (
								<p key={index} className="text-red-700 text-sm">
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
							<span>Importing...</span>
						</Button>
					) : (
						<Button
							type="submit"
							disabled={isSubmitting}
							aria-disabled={isSubmitting}
							className="flex flex-row gap-2 items-center justify-center hover:cursor-pointer w-full"
						>
							<span>Import note</span>
						</Button>
					)}
				</DialogFooter>
			</form>
		</DialogContent>
	</Dialog>;
}
