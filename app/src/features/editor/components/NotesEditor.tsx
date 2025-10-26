"use client";

import { EditorContent, useEditor } from "@tiptap/react";

function NotesEditor() {
    const editor = useEditor({
        extensions: [],
        immediatelyRender: false
    })

    return <EditorContent editor={editor} />
}

export default NotesEditor;