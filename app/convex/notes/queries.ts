import { v } from "convex/values";
import { query } from "../_generated/server";

const fetchNotes = query({
	args: {
		notebookId: v.id("notebooks"),
	},

	handler: async (ctx, { notebookId }) => {
		const userIdentity = await ctx.auth.getUserIdentity();
		if (!userIdentity) {
			throw new Error("Not authenticated");
		}

		const requesterId = userIdentity.subject;
		const notebook = await ctx.db.get(notebookId);

		if (!notebook) {
			throw new Error("Notebook not found");
		}

		const notebookOwner = notebook.owner;
		if (notebookOwner !== requesterId) {
			throw new Error("You do not have permission to view this notebook");
		}

		const notes = await ctx.db
			.query("notes")
			.withIndex("by_notebook_id", (q) => q.eq("notebookId", notebookId))
			.collect();

		return notes;
	},
});

export { fetchNotes };
