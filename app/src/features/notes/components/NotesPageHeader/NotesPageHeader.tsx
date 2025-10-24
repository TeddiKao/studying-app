import AddNoteButton from "./components/AddNoteButton";

function NotesPageHeader() {
    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Notes</h1>
            <AddNoteButton />
        </div>
    )
}

export default NotesPageHeader;