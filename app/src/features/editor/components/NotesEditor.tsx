"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Title } from "../extensions/nodes/Title";
import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";

type NotesEditorProps = {
	noteId: Id<"notes">;
}

function NotesEditor({ noteId }: NotesEditorProps) {
	const editor = useEditor({
		extensions: [Document, Text, Paragraph, Title],
		immediatelyRender: false,
	});

	const blocks = useQuery(
		api.blocks.queries.fetchBlocks,
		{ noteId }
	);

	useEffect(() => {
		if (!editor) return;
		if (!editor.isEmpty) return;
		if (!blocks) return;

		editor.commands.setContent(blocks);
	}, [blocks]);

	return <EditorContent className="ml-12 mt-16" editor={editor} />;
}

export default NotesEditor;
