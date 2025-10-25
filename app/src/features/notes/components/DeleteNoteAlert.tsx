"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogDescription, AlertDialogTitle, AlertDialogHeader, AlertDialogFooter, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useDeleteNoteAlertStore } from "../stores/deleteNoteAlert";
import { Spinner } from "@/components/ui/spinner";

function DeleteNoteAlert() {
    const { isOpen, isDeleting, openAlert, closeAlert } = useDeleteNoteAlertStore();

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
							className="bg-red-500 text-white opacity-75 hover:cursor-not-allowed"
						>
							<Spinner />
							<span className="text-sm">Deleting ...</span>
						</AlertDialogAction>
					) : (
						<AlertDialogAction
							disabled={false}
							aria-disabled={false}
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
