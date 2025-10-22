import NotebookCard from "@/features/notebooks/components/NotebookCard";
import NotebookDialog from "@/features/notebooks/components/NotebookDialog";
import NotebookPageHeader from "@/features/notebooks/components/NotebookPageHeader/NotebookPageHeader";

function Notebooks() {
	return (
		<>
			<div className="flex flex-col gap-2">
				<NotebookPageHeader />

				<div className="grid grid-cols-4 gap-4">
					<NotebookCard />
					<NotebookCard />
					<NotebookCard />
					<NotebookCard />
				</div>
			</div>

			<NotebookDialog mode="create" />
		</>
	);
}

export default Notebooks;
