"use client";

import NotebookIcon from "@/shared/components/icons/Notebook";
import { EllipsisVertical } from "lucide-react";

function NotebookCard() {
	return (
		<div className="flex flex-row items-center bg-gray-50 rounded-md shadow-md p-2">
			<button
				type="button"
				className="flex flex-row gap-2 items-center hover:cursor-pointer grow"
			>
				<NotebookIcon className="w-6 h-6 fill-gray-500" />
				<span className="flex flex-col gap-0.5">
					<span className="text-lg font-semibold text-left">
						History notebook
					</span>
					<span className="text-sm text-gray-500 text-left">
						30 notes
					</span>
				</span>
			</button>

			<button type="button" className="hover:cursor-pointer hover:bg-gray-300">
				<EllipsisVertical className="stroke-gray-500" />
			</button>
		</div>
	);
}

export default NotebookCard;
