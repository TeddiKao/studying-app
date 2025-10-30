import { Id } from "@convex/_generated/dataModel";
import { Node } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";
import { NewlyCreatedTiptapJSONBlock, TiptapJSONBlock } from "../types/blocks";
import { isNullOrUndefined } from "@/shared/utils/types";

function getEditorSelection(editor: Editor) {
	const { state } = editor;
	const { selection } = state;
	const { $from } = selection;

	const node = $from.node();

	return node;
}

function isCursorAtStartOfNode(editor: Editor) {
	const { state } = editor;
	const { selection } = state;
	const { $from } = selection;

	return $from.parentOffset === 0;
}

function getNodeFromId(
	editor: Editor,
	id: Id<"blocks">
): { targetNode: Node | null; targetPos: number | null } {
	let targetNode = null;
	let targetPos = null;

	editor.state.doc.descendants((node, pos) => {
		if (!node.type.isBlock) return;

		if (node.attrs.id === id) {
			targetNode = node;
			targetPos = pos;

			return;
		}
	});

	return { targetNode, targetPos };
}

function getCreatedNodes(editor: Editor) {
	const { state } = editor;
	const { doc } = state;

	const createdNodes: NewlyCreatedTiptapJSONBlock[] = [];

	doc.descendants((node, pos) => {
		if (!node.type.isBlock) return;
		if (isNullOrUndefined(node.attrs)) return;

		const { id } = node.attrs;

		if (!isNullOrUndefined(id)) {
			return;
		}

		const tempId = crypto.randomUUID();

		createdNodes.push({
			type: node.type.name,
			content: node.content.toJSON() ?? [],
			tempId: tempId,
		})
	})

	return createdNodes;
}

function getNodePosition(editor: Editor, targetNode: Node) {
	let foundPosition = 0;

	editor.state.doc.descendants((node, pos) => {
		if (node === targetNode) {
			foundPosition = pos;
			return false;
		}
	})

	return foundPosition;
}

export { getEditorSelection, isCursorAtStartOfNode, getNodeFromId, getCreatedNodes };
