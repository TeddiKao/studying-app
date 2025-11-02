import { Paragraph } from "@tiptap/extension-paragraph";

const CustomParagraph = Paragraph.extend({
    addOptions() {
        return {
            ...this.parent?.(),

            HTMLAttributes: {
                class: "mb-4",
            },
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