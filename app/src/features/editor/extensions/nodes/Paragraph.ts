import { Paragraph } from "@tiptap/extension-paragraph";
import { getEditorSelection, getNodePositionFromEditor, isCursorAtStartOfNode } from "../../utils/utils";

const CustomParagraph = Paragraph.extend({
    addOptions() {
        return {
            ...this.parent?.(),

            HTMLAttributes: {
                class: "mb-4",
            },
        }
    },

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const selectedNode = getEditorSelection(editor);
                if (selectedNode.type.name !== "paragraph") return false;

                const { dispatch } = editor.view;
                const { tr } = editor.state;

                if (isCursorAtStartOfNode(editor)) {
                    const nodePos = getNodePositionFromEditor(editor, selectedNode);
                    const insertPos = editor.state.doc.resolve(nodePos).before(1);

                    const newNode = editor.state.schema.nodeFromJSON({
                        type: "paragraph",
                        content: [],
                        attrs: {
                            id: null,
                            position: null,
                        }
                    })

                    tr.insert(insertPos, newNode);
                    dispatch(tr.scrollIntoView());

                    return true;
                }

                return false;
            }
        }
    },

    addAttributes() {
        return {
            ...this.parent?.(),

            id: {
                default: null,
                rendered: false,
                keepOnSplit: false,
            },

            position: {
                default: null,
                rendered: false,   
                keepOnSplit: false,
            },
        }
    }
})

export { CustomParagraph }