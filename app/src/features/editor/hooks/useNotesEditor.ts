"use client";

import { useEditor } from "@tiptap/react";
import { CustomParagraph } from "../extensions/nodes/Paragraph";
import { Title } from "../extensions/nodes/Title";
import {
	getEditorSelection,
	getNodeFromId,
} from "../utils/utils";
import { Placeholder } from "@tiptap/extensions";
import { useEditorStore } from "../stores/editorStore";

import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { isNullOrUndefined } from "@/shared/utils/types";
import { Id } from "@convex/_generated/dataModel";
import { useEffect } from "react";
import { createTransactionBatchPluginExtension } from "../extensions/plugins/transactionBatchPlugin";

function useNotesEditor(noteId: Id<"notes">) {
	const {
		selectedBlockId,
		selectedBlockContent,
		selectedBlockType,
		selectedBlockOriginalContent,
		updateSelectedBlockId,
		updateSelectedBlockOriginalContent,
		updateSelectedBlockType,
		updateSelectedBlockContent,

		clearSelectedBlockId,
		clearSelectedBlockContent,
		clearSelectedBlockType,
		clearSelectedBlockOriginalContent,
	} = useEditorStore();

	const updateBlock = useMutation(api.blocks.mutations.updateBlock);
	const bulkCreateBlocks = useMutation(api.blocks.mutations.bulkCreateBlocks);

	useEffect(() => {
		return () => {
			clearSelectedBlockId();
			clearSelectedBlockContent();
			clearSelectedBlockType();
			clearSelectedBlockOriginalContent();
		};
	}, [
		clearSelectedBlockId,
		clearSelectedBlockContent,
		clearSelectedBlockType,
		clearSelectedBlockOriginalContent,
	]);

	return useEditor(
		{
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
				createTransactionBatchPluginExtension(),
			],
			immediatelyRender: false,

			onSelectionUpdate: ({ editor }) => {
				const selectedNode = getEditorSelection(editor);
				if (!selectedNode.attrs.id) return;

				if (!selectedBlockId) {
					updateSelectedBlockId(selectedNode.attrs.id);
					updateSelectedBlockContent(
						selectedNode.content.toJSON() ?? []
					);
					updateSelectedBlockOriginalContent(
						selectedNode.content.toJSON() ?? []
					);
					updateSelectedBlockType(selectedNode.type.name);
					return;
				}

				if (selectedBlockId === selectedNode.attrs.id) {
					updateSelectedBlockContent(
						selectedNode.content.toJSON() ?? []
					);
					return;
				}

				if (selectedBlockType === Title.name) {
					if (selectedBlockContent?.length === 0) {
						const { targetNode, targetPos } = getNodeFromId(
							editor,
							selectedBlockId
						);

						if (
							isNullOrUndefined(targetNode) ||
							isNullOrUndefined(targetPos)
						)
							return;
						if (!selectedBlockOriginalContent) return;

						const newNode = editor.state.schema.nodeFromJSON({
							type: "title",
							attrs: targetNode.attrs,
							content: selectedBlockOriginalContent,
						});

						editor.commands.command(({ tr }) => {
							tr.replaceWith(
								targetPos,
								targetPos + targetNode.nodeSize,
								newNode
							);

							return true;
						});

						updateSelectedBlockContent(
							selectedBlockOriginalContent
						);
					}
				}

				updateBlock({
					id: selectedBlockId,
					content: selectedBlockContent ?? [],
				});

				updateSelectedBlockId(selectedNode.attrs.id);
				updateSelectedBlockContent(selectedNode.content.toJSON() ?? []);
				updateSelectedBlockType(selectedNode.type.name);
				updateSelectedBlockOriginalContent(
					selectedNode.content.toJSON() ?? []
				);
			},

			// onUpdate: async ({ editor }) => {
			// 	const { createdNodes, tempIdToNodeMapping } =
			// 		getCreatedNodes(editor);

			// 	if (createdNodes.length === 0) return;

			// 	const tempRealIdMappingObj = await bulkCreateBlocks({
			// 		blocks: createdNodes,
			// 		noteId,
			// 	});

			// 	const tempRealIdMapping = new Map(
			// 		Object.entries(tempRealIdMappingObj)
			// 	);

			// 	for (const [tempId, realId] of tempRealIdMapping) {
			// 		const targetNode = tempIdToNodeMapping.get(tempId);
			// 		if (!targetNode) continue;

			// 		const nodePos = getNodePosition(editor, targetNode);
			// 		if (isNullOrUndefined(nodePos)) continue;

			// 		const tr = editor.state.tr.setNodeMarkup(
			// 			nodePos,
			// 			undefined,
			// 			{
			// 				...targetNode.attrs,
			// 				id: realId,
			// 			}
			// 		);

			// 		editor.view.dispatch(tr);
			// 	}
			// },
		},
		[noteId]
	);
}

export default useNotesEditor;
