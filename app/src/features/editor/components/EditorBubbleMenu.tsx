"use client";

import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { Bold, Italic, Underline } from "lucide-react";

type EditorBubbleMenuProps = {
    editor: Editor;
};

function EditorBubbleMenu({ editor }: EditorBubbleMenuProps) {
	return (
		<BubbleMenu editor={editor}>
			<div className="flex flex-row gap-2">
				<Button type="button">
                    <Bold />
                </Button>

                <Button type="button">
                    <Italic />
                </Button>

                <Button type="button">
                    <Underline />
                </Button>
			</div>
		</BubbleMenu>
	);
}

export default EditorBubbleMenu;
