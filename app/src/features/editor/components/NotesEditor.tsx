"use client";

import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { convertBlocksToDBFormat } from "@convex/blocks/utils";
import useNotesEditor from "../hooks/useNotesEditor";

type NotesEditorProps = {
	noteId: Id<"notes">;
};

function NotesEditor({ noteId }: NotesEditorProps) {
	const editor = useNotesEditor();

	const blocks = useQuery(api.blocks.queries.fetchBlocks, { noteId });
	const bulkUpdateBlocks = useMutation(api.blocks.mutations.bulkUpdateBlocks);

	useEffect(() => {
		if (!editor) return;
		if (!editor.isEmpty) return;
		if (!blocks) return;

		editor.commands.setContent({
			type: "doc",
			content: blocks,
		});
	}, [blocks, editor]);

	useEffect(() => {
		function handleBeforeUnload() {
			if (!editor) return;

			bulkUpdateBlocks({
				blocks: convertBlocksToDBFormat(editor.getJSON().content)
			})
		}

		window.addEventListener("beforeunload", handleBeforeUnload);
		console.log("Event listener added");

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [editor, bulkUpdateBlocks]);

	return <EditorContent className="ml-16 mt-16" editor={editor} />;
}

export default NotesEditor;
