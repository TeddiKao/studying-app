import NotesPageHeader from "@/features/notes/components/NotesPageHeader/NotesPageHeader";

function NotesPage() {
	return (
		<div className="flex flex-col gap-3">
			<NotesPageHeader />

			<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"></div>
		</div>
	);
}

export default NotesPage;
