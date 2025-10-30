"use client";

import { nodeInputRule, useEditor } from "@tiptap/react";
import { CustomParagraph } from "../extensions/nodes/Paragraph";
import { Title } from "../extensions/nodes/Title";
import { getEditorSelection, getNodeFromId } from "../utils/utils";
import { Placeholder } from "@tiptap/extensions";
import { useEditorStore } from "../stores/editorStore";

import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { isNullOrUndefined } from "@/shared/utils/types";

function useNotesEditor() {
	const {
		selectedBlockId,
		selectedBlockContent,
		selectedBlockType,
		selectedBlockOriginalContent,
		updateSelectedBlockId,
		updateSelectedBlockOriginalContent,
		updateSelectedBlockType,
		clearSelectedBlockId,
		updateSelectedBlockContent,
	} = useEditorStore();

	const updateBlock = useMutation(api.blocks.mutations.updateBlock);

	return useEditor({
		extensions: [
			Document,
			Text,
			CustomParagraph,
			Title,
			Placeholder.configure({
				placeholder: ({ node }) => {
					if (node.type.name === "title") return "Enter title";

					return "Enter content";
				},
			}),
		],
		immediatelyRender: false,

		onSelectionUpdate: ({ editor }) => {
			const selectedNode = getEditorSelection(editor);
			if (!selectedNode.attrs.id) return;

			if (!selectedBlockId) {
				updateSelectedBlockId(selectedNode.attrs.id);
				updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
				updateSelectedBlockOriginalContent(selectedNode.content.toJSON() ?? []);
				updateSelectedBlockType(selectedNode.type.name);
				return;
			}

			if (selectedBlockId === selectedNode.attrs.id) {
				updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
				return;
			}

			console.log(selectedBlockType);

			if (selectedBlockType === Title.name) {
				if (selectedBlockContent?.length === 0) {
					const { targetNode, targetPos } = getNodeFromId(editor, selectedBlockId);

					if (isNullOrUndefined(targetNode) || isNullOrUndefined(targetPos)) return;
					if (!selectedBlockOriginalContent) return;

					const newNode = editor.state.schema.nodeFromJSON({
						type: "title",
						attrs: targetNode.attrs,
						content: selectedBlockOriginalContent,
					});

					editor.commands.command(({ tr }) => {
						tr.replaceWith(targetPos, targetPos + targetNode.nodeSize, newNode);

						return true;
					})
				}
			}

			updateBlock({
				id: selectedBlockId,
				content: selectedBlockContent ?? [],
			});

			updateSelectedBlockId(selectedNode.attrs.id);
			updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
			updateSelectedBlockType(selectedNode.type.name);
			updateSelectedBlockOriginalContent(selectedNode.content.toJSON() ?? []);
		},
	});
}

export default useNotesEditor;
