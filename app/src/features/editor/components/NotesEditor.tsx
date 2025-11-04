"use client";

import { EditorContent } from "@tiptap/react";
import { useEffect, useState } from "react";
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

	const [isSaving, setIsSaving] = useState(false);

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
		}
	}, [editor, bulkUpdateBlocks]);

	useEffect(() => {
		if (!editor) return;

		const saveInterval = setInterval(async () => {
			if (isSaving) return;

			setIsSaving(true);

			try {
				await bulkUpdateBlocks({
					blocks: convertBlocksToDBFormat(editor.getJSON().content),
				});
			} catch (error) {
				console.error(error);
			} finally {
				setIsSaving(false);
			}
		}, 5 * 1000);

		return () => {
			clearInterval(saveInterval);
		};
	}, [editor, bulkUpdateBlocks]);

	return (
		<>
			<EditorBubbleMenu editor={editor} />
			<EditorContent className="ml-16 mt-16" editor={editor} />
		</>
	);
}

export default NotesEditor;
