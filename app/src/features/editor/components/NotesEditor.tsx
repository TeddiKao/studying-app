"use client";

import { EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { convertBlocksToDBFormat } from "@convex/blocks/utils";
import useNotesEditor from "../hooks/useNotesEditor";
import EditorBubbleMenu from "./EditorBubbleMenu";

type NotesEditorProps = {
	noteId: Id<"notes">;
};

function NotesEditor({ noteId }: NotesEditorProps) {
	const editor = useNotesEditor(noteId);

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
				blocks: convertBlocksToDBFormat(editor.getJSON().content),
			});
		}

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [editor, bulkUpdateBlocks]);

	useEffect(() => {
		return () => {
			if (!editor) return;

			bulkUpdateBlocks({
				blocks: convertBlocksToDBFormat(editor.getJSON().content),
			});
		};
	}, [editor, bulkUpdateBlocks]);

	return (
		<>
			<EditorBubbleMenu editor={editor} />
			<EditorContent editor={editor} />
		</>
	);
}

export default NotesEditor;
