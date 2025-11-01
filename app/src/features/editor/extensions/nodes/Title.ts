import { mergeAttributes, Node } from "@tiptap/core";
import { getEditorSelection, isCursorAtStartOfNode } from "../../utils/utils";

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

                return false;
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