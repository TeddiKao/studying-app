import { v } from "convex/values";
import { query } from "../../../../convex/_generated/server";

const fetchNotebooks = query({
	args: { ownerId: v.string() },
	handler: async (ctx, { ownerId }) => {
		const notebooks = await ctx.db
			.query("notebooks")
			.withIndex("by_owner", (q) => q.eq("owner", ownerId))
            .collect();

        return notebooks;
	},
});

export { fetchNotebooks }