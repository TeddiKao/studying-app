"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogHeader, AlertDialogFooter, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useDeleteNoteAlertStore } from "../stores/deleteNoteAlert";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation } from "convex/react";

type DeleteNoteAlertProps = {
    noteId: Id<"notes"> | null;
}

function DeleteNoteAlert({ noteId }: DeleteNoteAlertProps) {
    const { isOpen, isDeleting, openAlert, closeAlert, startDeleting, stopDeleting } = useDeleteNoteAlertStore();

    const deleteNote = useMutation(api.notes.mutations.deleteNote);

    async function handleDelete() {
        if (!noteId) return;

        startDeleting();

        try {
            await deleteNote({ noteId });
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
					<AlertDialogTitle>Delete note?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this note?
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					{isDeleting ? (
						<AlertDialogAction
							disabled={true}
							aria-disabled={true}
                            onClick={handleDelete}
							className="bg-red-500 text-white opacity-75 hover:cursor-not-allowed"
						>
							<Spinner />
							<span className="text-sm">Deleting ...</span>
						</AlertDialogAction>
					) : (
						<AlertDialogAction
							disabled={false}
							aria-disabled={false}
                            onClick={handleDelete}
							className="bg-red-500 text-white hover:cursor-pointer"
						>
							<span className="text-sm">Delete</span>
						</AlertDialogAction>
					)}
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteNoteAlert;
