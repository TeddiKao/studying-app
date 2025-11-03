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
		<BubbleMenu className="bg-white shadow-md rounded-md" editor={editor}>
			<div className="flex flex-row">
				<Button className="bg-white hover:bg-gray-300" type="button">
                    <Bold className="stroke-gray-950" />
                </Button>

                <Button className="bg-white hover:bg-gray-300" type="button">
                    <Italic className="stroke-gray-950" />
                </Button>

                <Button className="bg-white hover:bg-gray-300" type="button">
                    <Underline className="stroke-gray-950" />
                </Button>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
