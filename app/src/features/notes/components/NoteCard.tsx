import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NoteIcon from "@/shared/components/icons/Note";
import { EllipsisVertical } from "lucide-react";
import NoteDropdown from "./NoteDropdown";

type NoteCardProps = {
	noteName: string;
};

function NoteCard({ noteName }: NoteCardProps) {
	return (
		<div className="flex flex-row items-center bg-gray-50 rounded-md shadow-md p-2">
			<button
				type="button"
				aria-label={`Open note ${noteName}`}
				className="flex flex-row gap-2 items-center hover:cursor-pointer grow"
			>
				<NoteIcon className="w-6 h-6 stroke-gray-500" />
				<span className="flex flex-col gap-0.5 text-left">
					<span className="text-lg font-semibold text-left">
						{noteName}
					</span>
				</span>
			</button>

			<DropdownMenu>
				<DropdownMenuTrigger>
					<button
						type="button"
						aria-label={`Options for note ${noteName}`}
						className="hover:cursor-pointer hover:bg-gray-300 rounded-md py-1"
					>
						<EllipsisVertical className="stroke-gray-500" />
					</button>
				</DropdownMenuTrigger>

				<NoteDropdown />
			</DropdownMenu>
		</div>
	);
}

export default NoteCard;
