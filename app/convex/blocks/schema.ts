import { defineTable } from "convex/server";
import { v } from "convex/values";

const blocks = defineTable({
    position: v.float64(),
    content: v.array(v.record(v.string(), v.any())),
    additionalAttributes: v.record(v.string(), v.any()),
    noteId: v.id("notes"),
}).index("by_note_id", ["noteId"])

export default blocks;