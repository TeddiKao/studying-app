import { Editor } from "@tiptap/react";

function getEditorSelection(editor: Editor) {
    const { state } = editor;
    const { selection } = state;

    console.log(selection.toJSON());

    return selection;
}