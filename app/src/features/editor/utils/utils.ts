import { Editor } from "@tiptap/react";

function getEditorSelection(editor: Editor) {
    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    const node = $from.node();

    return node;
}

export { getEditorSelection };