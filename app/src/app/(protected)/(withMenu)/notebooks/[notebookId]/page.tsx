"use client";

import EmptyNotesDisplay from "@/features/notes/components/EmptyNotesDisplay";
import NoteCard from "@/features/notes/components/NoteCard";
import NoteForm from "@/features/notes/components/NoteForm";
import NotesPageHeader from "@/features/notes/components/NotesPageHeader/NotesPageHeader";
import { useEditNoteFormStore } from "@/features/notes/stores/editNoteForm";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";

type NotesPageParams = {
	notebookId: Id<"notebooks">;
};

function NotesPage() {
	const { notebookId } = useParams() as NotesPageParams;

	const notes = useQuery(api.notes.queries.fetchNotes, {
		notebookId,
	});

	const { noteId } = useEditNoteFormStore();

	if (!notes) return null;

	return (
		<>
			<div className="flex flex-col gap-3">
				<NotesPageHeader />

				{notes.length > 0 ? (
					<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
						{notes.map((note) => (
							<NoteCard
								key={note._id}
								noteName={note.title}
								noteId={note._id}
							/>
						))}
					</div>
				) : (
					<EmptyNotesDisplay />
				)}
			</div>

			<NoteForm mode="create" noteId={null} notebookId={notebookId} />
			<NoteForm mode="edit" noteId={noteId} notebookId={notebookId} />
		</>
	);
}

export default NotesPage;
