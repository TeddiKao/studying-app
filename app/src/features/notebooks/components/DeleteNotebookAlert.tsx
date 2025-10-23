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
            await deleteNotebook({ notebookId })
            closeAlert();
        } catch (error) {
            console.error(error);
        } finally {
            stopDeleting();
        }
    }

	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => {
            if (open) {
                openAlert();
            } else {
                closeAlert();
            }
        }}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete notebook?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this notebook?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={isDeleting} className="bg-red-500 text-white" onClick={handleDelete}>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteNotebookAlert;
