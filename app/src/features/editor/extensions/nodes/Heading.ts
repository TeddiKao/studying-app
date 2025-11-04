import { Heading } from "@tiptap/extension-heading";
import { getCursorPosition, getEditorSelection, isCursorAtEndOfNode, isCursorAtStartOfNode } from "../../utils/utils";

const CustomHeading = Heading.extend({
	addOptions() {
		return {
			...this.parent?.(),
			levels: [1, 2, 3],
		};
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
		};
	},

    addKeyboardShortcuts() {
        return {
            Enter: ({ editor }) => {
                const selection = getEditorSelection(editor);
                if (selection.type.name !== this.name) return false;

                if (isCursorAtStartOfNode(editor)) {
                    return false;
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
                });

                dispatch(tr.scrollIntoView());

                return true;
            }
        }
    },

	renderHTML({ node, HTMLAttributes }) {
        const level = node.attrs.level;
		const classes = new Map<number, string>([
			[1, "text-4xl font-bold mb-4"],
			[2, "text-3xl font-bold mb-4"],
			[3, "text-2xl font-bold mb-4"],
		]);

        return [
            `h${level}`,
            {
                ...HTMLAttributes,
                class: `${HTMLAttributes.class ?? ""} ${classes.get(level)}`.trim(),
            },
            0
        ]
	},
});

export { CustomHeading };
