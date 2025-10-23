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

        const notebookToEdit = await ctx.db.get(notebookId);
        if (!notebookToEdit) {
            throw new Error("Notebook not found");
        }

        const notebookOwner = notebookToEdit.owner;
        if (notebookOwner !== userIdentity.subject) {
            throw new Error("You do not have permission to edit this notebook");
        }

        await ctx.db.patch(notebookId, {
            name,
            description,
        });
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

        const notebookToDelete = await ctx.db.get(notebookId);
        if (!notebookToDelete) {
            throw new Error("Notebook not found");
        }

        const notebookOwner = notebookToDelete.owner;
        if (notebookOwner !== userIdentity.subject) {
            throw new Error("You do not have permission to delete this notebook");
        }
    }
})

export { createNotebook, editNotebook, deleteNotebook }