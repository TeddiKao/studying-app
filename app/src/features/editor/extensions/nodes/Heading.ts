import { Heading } from "@tiptap/extension-heading";

const CustomHeading = Heading.extend({
	addOptions() {
		return {
			...this.parent?.(),
			levels: [1, 2, 3],
			HTMLAttributes: {
				class: "mb-4",
			},
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
                class: classes.get(level),
            },
            0
        ]
	},
});

export { CustomHeading };
