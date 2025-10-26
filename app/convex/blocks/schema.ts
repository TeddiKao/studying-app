import { defineTable } from "convex/server";
import { v } from "convex/values";

const blocks = defineTable({
    position: v.float64(),
    content: v.array(v.record(v.string(), v.any())),
    additionalAttributes: v.record(v.string(), v.any()),
    noteId: v.id("notes"),
})

export default blocks;