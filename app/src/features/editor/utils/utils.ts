import { Id } from "@convex/_generated/dataModel";
import { Editor } from "@tiptap/react";

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

function getNodeFromId(editor: Editor, id: Id<"blocks">) {
    let targetNode = null;

    editor.state.doc.descendants((node, pos) => {
        if (!node.type.isBlock) return;

        if (node.attrs.id === id) {
            targetNode = node;

            return
        }
    });

    return targetNode;
}

export { getEditorSelection, isCursorAtStartOfNode, getNodeFromId };