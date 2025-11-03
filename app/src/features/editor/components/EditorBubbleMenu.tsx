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
		<BubbleMenu editor={editor}>
			<div className="flex flex-row gap-2">
				<Button className="bg-white" type="button">
                    <Bold />
                </Button>

                <Button className="bg-white" type="button">
                    <Italic />
                </Button>

                <Button className="bg-white" type="button">
                    <Underline />
                </Button>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
