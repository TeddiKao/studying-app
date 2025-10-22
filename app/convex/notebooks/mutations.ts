import { v } from "convex/values";
import { mutation } from "../_generated/server";

const createNotebook = mutation({
    args: {
        name: v.string(),
        description: v.string(),
        ownerId: v.string(),
    },

    handler: async (ctx, { name, description, ownerId }) => {
        const newNotebookId = await ctx.db.insert("notebooks", {
            name,
            description,
            owner: ownerId,
            noteCount: 0,
        });

        return newNotebookId;
    }
})

export { createNotebook }