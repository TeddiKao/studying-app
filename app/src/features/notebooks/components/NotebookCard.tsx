import NotebookIcon from "@/shared/components/icons/Notebook";

function NotebookCard() {
	return (
		<div className="bg-gray-50 rounded-md shadow-md p-2">
			<button type="button" className="flex flex-row gap-2 items-center">
				<NotebookIcon className="w-6 h-6 fill-gray-500" />
				<span className="flex flex-col gap-0.5">
					<span className="text-lg font-semibold text-left">History notebook</span>
					<span className="text-sm text-gray-500 text-left">30 notes</span>
				</span>
			</button>
		</div>
	);
}

export default NotebookCard;
