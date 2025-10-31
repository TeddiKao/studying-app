import { Id } from "@convex/_generated/dataModel";
import { Node } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";
import { NewlyCreatedTiptapJSONAnchorBlock, NewlyCreatedTiptapJSONBlock, TiptapJSONBlock } from "../types/blocks";
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

	const createdNodes: NewlyCreatedTiptapJSONAnchorBlock[] = [];
	const tempIdToNodeMapping = new Map<string, Node>();

	doc.descendants((node, pos) => {
		if (!node.type.isBlock) return;
		if (isNullOrUndefined(node.attrs)) return;

		const { id } = node.attrs;

		if (!isNullOrUndefined(id)) {
			return;
		}

		const tempId = crypto.randomUUID();
		const previousNode = getPreviousNode(editor, node);

		if (isNullOrUndefined(previousNode)) return;

		if (previousNode?.attrs.id) {
			createdNodes.push({
				type: node.type.name,
				content: node.content.toJSON() ?? [],
				tempId: tempId,
				position: {
					relativeTo: previousNode.attrs.id,
					placement: "after",
				},
				followingBlocks: [],
			});

			tempIdToNodeMapping.set(tempId, node);
		} else {
			for (const createdNode of createdNodes) {
				const followingBlocks = createdNode?.followingBlocks;

				let blockReference = null;
				if (!isNullOrUndefined(followingBlocks)) {
					const followingBlocksLength = followingBlocks.length;
					const lastFollowingBlock = followingBlocks[followingBlocksLength - 1];

					blockReference = lastFollowingBlock ?? createdNode;
				} else {
					blockReference = createdNode;
				}

				const nodeReference = tempIdToNodeMapping.get(blockReference?.tempId);
				
				if (isNullOrUndefined(nodeReference)) return;

				const immediatelyAfter = isImmediatelyAfter(editor, nodeReference, node);

				if (immediatelyAfter) {
					followingBlocks?.push({
						type: node.type.name,
						content: node.content.toJSON() ?? [],
						tempId: tempId,
					});

					tempIdToNodeMapping.set(tempId, node);
				}
			}
		}
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

function getPreviousNode(editor: Editor, targetNode: Node) {
	const pos = getNodePosition(editor, targetNode);
	const resolvedPos = editor.state.doc.resolve(pos);

	const index = resolvedPos.index(0);
	if (index === 0) return null;

	const previousNode = editor.state.doc.child(index - 1);

	return previousNode;
}

function isImmediatelyAfter(editor: Editor, nodeA: Node, nodeB: Node) {
	const nodeAPos = getNodePosition(editor, nodeA);
	const nodeBPos = getNodePosition(editor, nodeB);

	return nodeAPos + nodeA.content.size === nodeBPos;
}

export { getEditorSelection, isCursorAtStartOfNode, getNodeFromId, getCreatedNodes, getPreviousNode, getNodePosition, isImmediatelyAfter };
