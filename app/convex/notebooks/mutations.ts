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

const editNotebook = mutation({
    args: {
        notebookId: v.id("notebooks"),
        name: v.string(),
        description: v.string(),
    },

    handler: async (ctx, { notebookId, name, description }) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if (!userIdentity) {
            throw new Error("Not authenticated");
        }

        await ctx.db.patch(notebookId, {
            name,
            description,
        })
    }
})

const deleteNotebook = mutation({
    args: {
        notebookId: v.id("notebooks"),
    },

    handler: async (ctx, { notebookId }) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if (!userIdentity) {
            throw new Error("Not authenticated");
        }

        await ctx.db.delete(notebookId);
    }
})

export { createNotebook, deleteNotebook }