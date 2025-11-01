import { Id } from "@convex/_generated/dataModel";
import { Node } from "@tiptap/pm/model";
import { Editor } from "@tiptap/react";
import { NewlyCreatedTiptapJSONAnchorBlock } from "../types/blocks";
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
		const previousNode = getPreviousNodeFromEditor(editor, node);

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
					const lastFollowingBlock =
						followingBlocks[followingBlocksLength - 1];

					blockReference = lastFollowingBlock ?? createdNode;
				} else {
					blockReference = createdNode;
				}

				const nodeReference = tempIdToNodeMapping.get(
					blockReference?.tempId
				);

				if (isNullOrUndefined(nodeReference)) return;

				const immediatelyAfter = isImmediatelyAfter(
					editor,
					nodeReference,
					node
				);

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
	});

	return {
		createdNodes,
		tempIdToNodeMapping,
	};
}

function getNodePositionFromEditor(editor: Editor, targetNode: Node) {
	return getNodePositionFromDocState(editor.state.doc, targetNode);
}

function getNodePositionFromDocState(doc: Node, targetNode: Node) {
	let foundPosition = 0;

	doc.descendants((node, pos) => {
		if (!node.type.isBlock) return;

		if (node === targetNode) {
			foundPosition = pos;
			return false;
		}
	});

	return foundPosition;
}

function getPreviousNodeFromEditor(editor: Editor, targetNode: Node) {
	return getPreviousNodeFromDocState(editor.state.doc, targetNode);
}

function getPreviousNodeFromDocState(doc: Node, targetNode: Node) {
	const pos = getNodePositionFromDocState(doc, targetNode);
	const resolvedPos = doc.resolve(pos);

	const index = resolvedPos.index(0);
	if (index === 0) return null;

	const previousNode = doc.child(index - 1);

	return previousNode;
}

function isImmediatelyAfter(editor: Editor, nodeA: Node, nodeB: Node) {
	const nodeAPos = getNodePositionFromEditor(editor, nodeA);
	const nodeBPos = getNodePositionFromEditor(editor, nodeB);

	return nodeAPos + nodeA.nodeSize === nodeBPos;
}

function isImmediatelyAfterFromDocState(doc: Node, nodeA: Node, nodeB: Node) {
	const nodeAPos = getNodePositionFromDocState(doc, nodeA);
	const nodeBPos = getNodePositionFromDocState(doc, nodeB);

	return nodeAPos + nodeA.nodeSize === nodeBPos;
}

export {
	getEditorSelection,
	isCursorAtStartOfNode,
	getNodeFromId,
	getCreatedNodes,
	getPreviousNodeFromEditor,
	getNodePositionFromEditor,
	isImmediatelyAfter,
	isImmediatelyAfterFromDocState,
};
