import { Node } from "@tiptap/core";

const Title = Node.create({
	name: "title",

	group: "block",
	content: "inline*",
	defining: true,

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
});
