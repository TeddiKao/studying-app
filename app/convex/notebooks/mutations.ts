import { v } from "convex/values";
import { mutation } from "../_generated/server";

const createNotebook = mutation({
    args: {
        name: v.string(),
        description: v.string(),
    },

    handler: async (ctx, { name, description }) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if (!userIdentity) {
            throw new Error("Not authenticated");
        }

        const newNotebookId = await ctx.db.insert("notebooks", {
            name,
            description,
            owner: userIdentity?.subject,
            noteCount: 0,
        });

        return newNotebookId;
    }
})

export { createNotebook }