import { Node } from "@tiptap/core";

const Title = Node.create({
    name: "title",

    group: "block",
    content: "inline*",
    defining: true,
})