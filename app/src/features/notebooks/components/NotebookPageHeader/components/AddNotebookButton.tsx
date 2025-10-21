"use client";

import PlusIcon from "@/shared/components/icons/Plus";

function AddNotebookButton() {
	return (
		<button
			type="button"
			className="flex flex-row gap-2 items-center bg-gray-950 text-white px-4 py-2 rounded-md hover:cursor-pointer"
		>
			<PlusIcon className="w-4 h-4 fill-white" />
			<span>Add notebook</span>
		</button>
	);
}

export default AddNotebookButton;
