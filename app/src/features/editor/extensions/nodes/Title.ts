import { mergeAttributes, Node } from "@tiptap/core";

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
			},

			position: {
				default: null,
				rendered: false,
			},
		};
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