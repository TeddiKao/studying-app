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
		<BubbleMenu className="bg-white shadow-md" editor={editor}>
			<div className="flex flex-row gap-2">
				<Button className="bg-white" type="button">
                    <Bold className="stroke-gray-950" />
                </Button>

                <Button className="bg-white" type="button">
                    <Italic className="stroke-gray-950" />
                </Button>

                <Button className="bg-white" type="button">
                    <Underline className="stroke-gray-950" />
                </Button>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
