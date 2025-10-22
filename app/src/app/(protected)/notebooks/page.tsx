import NotebookDialog from "@/features/notebooks/components/NotebookDialog";
import NotebookPageHeader from "@/features/notebooks/components/NotebookPageHeader/NotebookPageHeader";

function Notebooks() {
	return (
		<>
			<div className="flex flex-col gap-3">
				<NotebookPageHeader />

				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gridcols-5">
					{/* TODO: Add rendering logic here */}
				</div>
			</div>

			<NotebookDialog mode="create" />
		</>
	);
}

export default Notebooks;
