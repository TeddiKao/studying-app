import { mergeAttributes, Node } from "@tiptap/core";
import { getCursorPosition, getEditorSelection, getNodePositionFromDocState, isCursorAtEndOfNode, isCursorAtStartOfNode } from "../../utils/utils";
import { isNullOrUndefined } from "@/shared/utils/types";

const Title = Node.create({
	name: "title",

	group: "block",
	content: "inline*",
	defining: true,
    
    addOptions() {
        return {
            HTMLAttributes: {
                class: "title text-5xl font-bold mb-4"
            },
        }
    },

	addAttributes() {
		return {
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
		};
	},

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const selection = getEditorSelection(editor);
                if (selection.type.name !== "title") return false;

                if (isCursorAtStartOfNode(editor)) {
                    return true;
                }

                if (isCursorAtEndOfNode(editor)) {
                    return false;
                }

                const { state, view } = editor;
                const { dispatch } = view;
                const { tr } = state;
                
                const cursorPos = getCursorPosition(editor);
                const paragraphType = state.schema.nodes.paragraph;

                tr.split(cursorPos);

                tr.setNodeMarkup(cursorPos + 1, paragraphType, {
                    id: null,
                    position: null,
                })

                return true;
            },

            Backspace: ({ editor }) => {
                const selection = getEditorSelection(editor);
                if (selection.type.name !== "title") return false;

                if (selection.content.size === 0) {
                    return true;
                }

                return false;
            }
        }
    },

    renderHTML({ HTMLAttributes }) {
        return ["h1", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },

    parseHTML() {
        return [
            {
                tag: "h1",
            }
        ]
    }
});

export { Title };