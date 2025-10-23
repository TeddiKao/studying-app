"use client";

import NotebookDialog from "@/features/notebooks/components/NotebookDialog";
import NotebookPageHeader from "@/features/notebooks/components/NotebookPageHeader/NotebookPageHeader";

import { api } from "../../../../convex/_generated/api";
import NotebookCard from "@/features/notebooks/components/NotebookCard";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEditNotebookFormStore } from "@/features/notebooks/stores/editNotebookForm";
import { Id } from "../../../../convex/_generated/dataModel";

function Notebooks() {
	const { user } = useUser();

	const notebooks = useQuery(api.notebooks.queries.fetchNotebooks, {
		ownerId: user?.id ?? null,
	});

	const { notebookId } = useEditNotebookFormStore();

	if (!notebooks) return null;

	return (
		<>
			<div className="flex flex-col gap-3">
				<NotebookPageHeader />

				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{notebooks.map((notebook) => (
						<NotebookCard
							key={notebook._id}
							notebookId={notebook._id}
							name={notebook.name}
							notesCount={notebook.noteCount}
						/>
					))}
				</div>
			</div>

			<NotebookDialog mode="create" notebookId={null} />
			<NotebookDialog
				mode="edit"
				notebookId={(notebookId as Id<"notebooks">) ?? null}
			/>
		</>
	);
}

export default Notebooks;
