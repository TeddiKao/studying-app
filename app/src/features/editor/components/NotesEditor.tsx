"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Title } from "../extensions/nodes/Title";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { getEditorSelection } from "../utils/utils";

type NotesEditorProps = {
	noteId: Id<"notes">;
};

function NotesEditor({ noteId }: NotesEditorProps) {
	const updateBlock = useMutation(api.blocks.mutations.updateBlock);
	const editor = useEditor({
		extensions: [Document, Text, Paragraph, Title],
		immediatelyRender: false,

		onSelectionUpdate: ({ editor }) => {
			const selectedNode = getEditorSelection(editor);

			updateBlock({
				id: selectedNode.attrs.id,
				content: selectedNode.content.toJSON(),
			})
		}
	});

	const blocks = useQuery(api.blocks.queries.fetchBlocks, { noteId });

	useEffect(() => {
		if (!editor) return;
		if (!editor.isEmpty) return;
		if (!blocks) return;

		editor.commands.setContent({
			type: "doc",
			content: blocks,
		});
	}, [blocks, editor]);

	return <EditorContent className="ml-16 mt-16" editor={editor} />;
}

export default NotesEditor;
