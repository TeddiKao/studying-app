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

export { fetchNotebooks }