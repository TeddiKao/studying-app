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

	const fetchNotebooks = useQuery(api.notes.queries.fetchNotes, {
		notebookId: id,
	})

	return (
		<>
			<div className="flex flex-col gap-3">
				<NotesPageHeader />

				<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"></div>
			</div>

			<NoteForm mode="create" noteId={null} />
		</>
	);
}

export default NotesPage;
