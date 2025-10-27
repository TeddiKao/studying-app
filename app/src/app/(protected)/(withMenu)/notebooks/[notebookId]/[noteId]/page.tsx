import NotesEditor from "@/features/editor/components/NotesEditor";
import { Id } from "@convex/_generated/dataModel";

type NotesEditorPageProps = {
	params: Promise<{ notebookId: Id<"notebooks">, noteId: Id<"notes"> }>;
};

async function NotesEditorPage({ params }: NotesEditorPageProps) {
	const { noteId } = await params;

	return (
		<div>
			<NotesEditor noteId={noteId} />
		</div>
	);
}

export default NotesEditorPage;
