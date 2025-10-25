import NoteIcon from "@/shared/components/icons/Note";
import { EllipsisVertical } from "lucide-react";

function NoteCard() {
	return (
		<div className="flex flex-row items-center bg-gray-50 rounded-md shadow-md p-2">
			<button
				type="button"
				className="flex flex-row gap-2 items-center hover:cursor-pointer grow"
			>
				<NoteIcon className="w-6 h-6 stroke-gray-500" />
				<span className="flex flex-col gap-0.5 text-left">
					<span className="text-lg font-semibold text-left">
						Chapter 5
					</span>
				</span>
			</button>

			<button
				type="button"
				className="hover:cursor-pointer hover:bg-gray-300 rounded-md py-1"
			>
				<EllipsisVertical className="stroke-gray-500" />
			</button>
		</div>
	);
}

export default NoteCard;
