import NotesPageHeader from "@/features/notes/components/NotesPageHeader/NotesPageHeader";

function NotesPage() {
	return (
		<div className="flex flex-col gap-3">
			<NotesPageHeader />

			<div className="grid grid-cols-4 gap-4"></div>
		</div>
	);
}

export default NotesPage;
