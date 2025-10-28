"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { Title } from "../extensions/nodes/Title";
import { useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { getEditorSelection } from "../utils/utils";
import { CustomParagraph } from "../extensions/nodes/Paragraph";
import { Placeholder } from "@tiptap/extensions";
import { useEditorStore } from "../stores/editorStore";

type NotesEditorProps = {
	noteId: Id<"notes">;
};

function NotesEditor({ noteId }: NotesEditorProps) {
	const updateBlock = useMutation(api.blocks.mutations.updateBlock);
	const {
		selectedBlockId,
		selectedBlockContent,
		updateSelectedBlockId,
		clearSelectedBlockId,
		updateSelectedBlockContent,
	} = useEditorStore();

	const editor = useEditor({
		extensions: [
			Document,
			Text,
			CustomParagraph,
			Title,
			Placeholder.configure({
				placeholder: ({ node }) => {
					if (node.type.name === "title") return "Enter title";
					
					return "Enter content";
				}
			}),
		],
		immediatelyRender: false,

		onSelectionUpdate: ({ editor }) => {
			const selectedNode = getEditorSelection(editor);
			if (!selectedNode.attrs.id) return;

			if (!selectedBlockId) {
				updateSelectedBlockId(selectedNode.attrs.id);
				updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
				return;
			}

			if (selectedBlockId === selectedNode.attrs.id) {
				updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
				return;
			}

			updateBlock({
				id: selectedBlockId,
				content: selectedBlockContent ?? [],
			});

			updateSelectedBlockId(selectedNode.attrs.id);
			updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
		},
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
