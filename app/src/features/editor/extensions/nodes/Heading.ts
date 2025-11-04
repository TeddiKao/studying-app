import { Heading } from "@tiptap/extension-heading";

const CustomHeading = Heading.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            levels: [1, 2, 3],
            HTMLAttributes: {
                class: "mb-4",
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