"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import { Paragraph } from "@tiptap/extension-paragraph";

function NotesEditor() {
    const editor = useEditor({
        extensions: [Document, Text, Paragraph],
        immediatelyRender: false
    })

    return <EditorContent className="ml-12 mt-16" editor={editor} />
}

export default NotesEditor;