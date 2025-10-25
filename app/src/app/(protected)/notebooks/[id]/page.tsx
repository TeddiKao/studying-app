"use client";

import NoteCard from "@/features/notes/components/NoteCard";
import NoteForm from "@/features/notes/components/NoteForm";
import NotesPageHeader from "@/features/notes/components/NotesPageHeader/NotesPageHeader";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

type NotesPageParams = {
	id: Id<"notebooks">;
}

function NotesPage() {
	const { id } = useParams() as NotesPageParams;

	const notes = useQuery(api.notes.queries.fetchNotes, {
		notebookId: id,
	});

	if (!notes) return null;

	return (
		<>
			<div className="flex flex-col gap-3">
				<NotesPageHeader />

				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
					{notes.map((note) => (
						<NoteCard key={note._id} noteName={note.name} noteId={note._id} />
					))}
				</div>
			</div>

			<NoteForm mode="create" noteId={null} notebookId={id} />
		</>
	);
}

export default NotesPage;
