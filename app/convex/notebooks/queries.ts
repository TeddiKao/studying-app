import { v } from "convex/values";
import { query } from "../_generated/server";

const fetchNotebooks = query({
	args: { ownerId: v.union(v.string(), v.null()) },
	handler: async (ctx, { ownerId }) => {
		if (!ownerId) return [];
		
		const userIdentity = await ctx.auth.getUserIdentity();
		if (!userIdentity) {
			throw new Error("Not authenticated");
		}

		const requesterId = userIdentity.subject;
		if (requesterId !== ownerId) {
			throw new Error("You do not have permission to view this notebook");
		}

		const notebooks = await ctx.db
			.query("notebooks")
			.withIndex("by_owner", (q) => q.eq("owner", ownerId))
            .collect();

        return notebooks;
	},
});

const retrieveNotebookInfo = query({
	args: { notebookId: v.union(v.id("notebooks"), v.null()) },
	handler: async (ctx, { notebookId }) => {
		if (!notebookId) return null;

		const notebook = await ctx.db.get(notebookId);
		if (!notebook) {
			throw new Error("Notebook not found");
		}

		const userIdentity = await ctx.auth.getUserIdentity();
		if (!userIdentity) {
			throw new Error("Not authenticated");
		}

		const notebookOwner = notebook.owner;
		if (notebookOwner !== userIdentity.subject) {
			throw new Error("You do not have permission to view this notebook");
		}

		return notebook;
	},
})

export { fetchNotebooks, retrieveNotebookInfo }