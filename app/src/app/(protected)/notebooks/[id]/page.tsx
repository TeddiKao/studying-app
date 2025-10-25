import NoteCard from "@/features/notes/components/NoteCard";
import NoteForm from "@/features/notes/components/NoteForm";
import NotesPageHeader from "@/features/notes/components/NotesPageHeader/NotesPageHeader";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useQuery } from "convex/react";

type NotesPageProps = {
	params: Promise<{ id: Id<"notebooks"> }>;
};

async function NotesPage({ params }: NotesPageProps) {
	const { id } = await params;

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
						<NoteCard key={note._id} noteName={note.name} />
					))}
				</div>
			</div>

			<NoteForm mode="create" noteId={null} />
		</>
	);
}

export default NotesPage;
