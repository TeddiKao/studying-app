import { v } from "convex/values";
import { query } from "../_generated/server";

const fetchNotebooks = query({
	args: { ownerId: v.union(v.string(), v.null()) },
	handler: async (ctx, { ownerId }) => {
		if (!ownerId) return [];
		
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
		return notebook;
	},
})

export { fetchNotebooks, retrieveNotebookInfo }