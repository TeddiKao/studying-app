"use client";

import { useEffect, useState } from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import MenuItem from "@/shared/components/MenuItem";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Bold, ChevronDown, Italic, Underline } from "lucide-react";
import { getActiveHeadingStyle } from "../utils/utils";

type EditorBubbleMenuProps = {
	editor: Editor | null;
};

type BubbleMenuMarkButtonProps = {
	editor: Editor;
	mark: "bold" | "italic" | "underline";
};

function BubbleMenuMarkButton({ editor, mark }: BubbleMenuMarkButtonProps) {
	const [isMarkActive, setIsMarkActive] = useState(false);

	function handleMarkButtonClick() {
		if (mark === "bold") {
			editor.chain().focus().toggleBold().run();
		} else if (mark === "italic") {
			editor.chain().focus().toggleItalic().run();
		} else if (mark === "underline") {
			editor.chain().focus().toggleUnderline().run();
		}
	}

	const iconMap = new Map<string, React.ReactNode>([
		["bold", <Bold key={"bold"} className="stroke-gray-950 h-4 w-4" />],
		["italic", <Italic key={"italic"} className="stroke-gray-950 h-4 w-4" />],
		["underline", <Underline key={"underline"} className="stroke-gray-950 h-4 w-4" />],
	]);

	useEffect(() => {
		function updateActive() {
			setIsMarkActive(editor.isActive(mark));
		}

		editor.on("transaction", updateActive);

		return () => {
			editor.off("transaction", updateActive);
		};
	}, [editor, mark]);

	return isMarkActive ? (
		<button
			onClick={handleMarkButtonClick}
			className="bg-gray-300 hover:bg-gray-300 p-1.5 rounded-md"
			type="button"
		>
			{iconMap.get(mark)}
		</button>
	) : (
		<button
			onClick={handleMarkButtonClick}
			className="bg-white hover:bg-gray-300 p-1.5 rounded-md"
			type="button"
		>
			{iconMap.get(mark)}
		</button>
	);
}

function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
	if (!editor) return null;

	return (
		<BubbleMenu
			className="bg-white shadow-md rounded-md p-1"
			editor={editor}
		>
			<div className="flex flex-row">
				<div className="flex flex-row">
					<BubbleMenuMarkButton editor={editor} mark="bold" />
					<BubbleMenuMarkButton editor={editor} mark="italic" />
					<BubbleMenuMarkButton editor={editor} mark="underline" />
				</div>

				<div className="p-1.5">
					<Separator className="bg-gray-400" orientation="vertical" />
				</div>

				<div>
					<Popover>
						<PopoverTrigger asChild>
							<button className="flex flex-row gap-2 items-center text-left rounded px-2 py-1 text-sm">
								<span>{getActiveHeadingStyle(editor)}</span>
								<ChevronDown className="w-5 h-5 stroke-gray-950" />
							</button>
						</PopoverTrigger>

						<PopoverContent
							align="start"
							alignOffset={-8}
							side="bottom"
							className="w-[140px] p-1 border-none"
						>
							<MenuItem
								onClick={() =>
									editor
										.chain()
										.focus()
										.setHeading({ level: 1 })
										.run()
								}
							>
								Heading 1
							</MenuItem>

							<MenuItem
								onClick={() =>
									editor
										.chain()
										.focus()
										.setHeading({ level: 2 })
										.run()
								}
							>
								Heading 2
							</MenuItem>

							<MenuItem
								onClick={() =>
									editor
										.chain()
										.focus()
										.setHeading({ level: 3 })
										.run()
								}
							>
								Heading 3
							</MenuItem>
							<MenuItem
								onClick={() =>
									editor.chain().focus().setParagraph().run()
								}
							>
								Paragraph
							</MenuItem>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
