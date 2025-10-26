import { defineTable } from "convex/server";
import { v } from "convex/values";

const notes = defineTable({
	title: v.string(),
	description: v.string(),
	notebookId: v.id("notebooks"),
})
	.index("by_notebook_id", ["notebookId"])
	.index("by_notebook_id_and_title", ["notebookId", "title"]);

export default notes;
