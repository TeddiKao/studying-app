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

function DeleteNotebookAlert() {
	const {
		isOpen,
		isDeleting,
		openAlert,
		closeAlert,
		startDeleting,
		stopDeleting,
	} = useDeleteNotebookAlertStore();

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
					<AlertDialogAction>Delete</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteNotebookAlert;
