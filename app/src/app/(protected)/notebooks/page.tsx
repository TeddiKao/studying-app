"use client";

import NotebookDialog from "@/features/notebooks/components/NotebookDialog";
import NotebookPageHeader from "@/features/notebooks/components/NotebookPageHeader/NotebookPageHeader";

import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import NotebookCard from "@/features/notebooks/components/NotebookCard";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";

function Notebooks() {
	const { user } = useUser();

	const notebooks = useQuery(api.notebooks.queries.fetchNotebooks, {
		ownerId: user?.id ?? null,
	})

	if (!notebooks) return null;

	return (
		<>
			<div className="flex flex-col gap-3">
				<NotebookPageHeader />

				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{notebooks.map((notebook) => (
						<NotebookCard
							key={notebook._id}
							name={notebook.name}
							notesCount={notebook.noteCount}
						/>
					))}
				</div>
			</div>

			<NotebookDialog mode="create" />
		</>
	);
}

export default Notebooks;
