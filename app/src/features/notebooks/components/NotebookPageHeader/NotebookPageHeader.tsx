import AddNotebookButton from "./components/AddNotebookButton";

function NotebookPageHeader() {
	return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-bold">Notebooks</h1>
            <AddNotebookButton />
        </div>
    );
}

export default NotebookPageHeader;