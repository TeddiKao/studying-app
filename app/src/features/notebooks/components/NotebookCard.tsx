import NotebookIcon from "@/shared/components/icons/Notebook";

function NotebookCard() {
    return (
        <div className="flex flex-row gap-2 items-center bg-white shadow-md p-2">
            <NotebookIcon className="w-6 h-6 fill-gray-500" />
            <div className="flex flex-col gap-0.5">
                <h3 className="text-lg font-semibold">History notebook</h3>
                <p className="text-sm text-gray-500">30 notes</p>
            </div>
        </div>
    )
}

export default NotebookCard;