"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Bold, Italic, Underline } from "lucide-react";

type EditorBubbleMenuProps = {
    editor: Editor | null;
};

function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
    if (!editor) return null;

	return (
		<BubbleMenu className="bg-white shadow-md rounded-md p-1" editor={editor}>
			<div className="flex flex-row">
				<button className="bg-white hover:bg-gray-300 p-1.5 rounded-md" type="button">
                    <Bold className="stroke-gray-950 h-4 w-4" />
                </button>

                <button className="bg-white hover:bg-gray-300 p-1.5 rounded-md" type="button">
                    <Italic className="stroke-gray-950 h-4 w-4" />
                </button>

                <button className="bg-white hover:bg-gray-300 p-1.5 rounded-md" type="button">
                    <Underline className="stroke-gray-950 h-4 w-4" />
                </button>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
