import NotebookDialog from "@/features/notebooks/components/NotebookDialog";
import NotebookPageHeader from "@/features/notebooks/components/NotebookPageHeader/NotebookPageHeader";

function Notebooks() {
	return (
		<>
			<div className="flex flex-col">
				<NotebookPageHeader />
			</div>

			<NotebookDialog mode="create" />
		</>
	);
}

export default Notebooks;
