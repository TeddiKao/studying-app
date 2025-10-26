import { defineTable } from "convex/server";
import { v } from "convex/values";

const notes = defineTable({
    title: v.optional(v.string()),
    name: v.optional(v.string()),
    description: v.string(),
    notebookId: v.id("notebooks"),
}).index("by_notebook_id", ["notebookId"]);

export default notes;