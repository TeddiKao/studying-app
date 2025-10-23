"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteNotebookAlertStore } from "../stores/deleteNotebookAlert";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Spinner } from "@/components/ui/spinner";

type DeleteNotebookAlertProps = {
	notebookId: Id<"notebooks">;
};

function DeleteNotebookAlert({ notebookId }: DeleteNotebookAlertProps) {
	const {
		isOpen,
		isDeleting,
		openAlert,
		closeAlert,
		startDeleting,
		stopDeleting,
	} = useDeleteNotebookAlertStore();

	const deleteNotebook = useMutation(api.notebooks.mutations.deleteNotebook);

	async function handleDelete() {
		startDeleting();

		try {
			await deleteNotebook({ notebookId });
			closeAlert();
		} catch (error) {
			console.error(error);
		} finally {
			stopDeleting();
		}
	}

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={(open) => {
				if (open) {
					openAlert();
				} else {
					closeAlert();
				}
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete notebook?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this notebook?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{isDeleting ? (
						<AlertDialogAction
							disabled={true}
							className="bg-red-500 text-white opacity-75"
							onClick={handleDelete}
						>
							<Spinner />
							<span className="text-sm">Deleting ...</span>
						</AlertDialogAction>
					) : (
						<AlertDialogAction
							disabled={false}
							className="bg-red-500 text-white"
							onClick={handleDelete}
						>
							<span className="text-sm">Delete</span>
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteNotebookAlert;
