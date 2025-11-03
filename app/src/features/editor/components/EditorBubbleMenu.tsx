"use client";

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

type EditorBubbleMenuProps = {
	editor: Editor | null;
};

type BubbleMenuMarkButtonProps = {
	editor: Editor;
	mark: "bold" | "italic" | "underline";
};

function BubbleMenuMarkButton({ editor, mark }: BubbleMenuMarkButtonProps) {
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
		["bold", <Bold className="stroke-gray-950 h-4 w-4" />],
		["italic", <Italic className="stroke-gray-950 h-4 w-4" />],
		["underline", <Underline className="stroke-gray-950 h-4 w-4" />],
	]);

	const isActive = editor.isActive(mark);

	return isActive ? (
		<button
			onClick={handleMarkButtonClick}
			className="bg-gray-600 hover:bg-gray-300 p-1.5 rounded-md"
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
								<span>Paragraph</span>
								<ChevronDown className="w-5 h-5 stroke-gray-950" />
							</button>
						</PopoverTrigger>

						<PopoverContent
							align="start"
							alignOffset={-8}
							side="bottom"
							className="w-[140px] p-1 border-none"
						>
							<MenuItem onClick={() => {}}>Heading 1</MenuItem>
							<MenuItem onClick={() => {}}>Heading 2</MenuItem>
							<MenuItem onClick={() => {}}>Heading 3</MenuItem>
							<MenuItem onClick={() => {}}>Paragraph</MenuItem>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
