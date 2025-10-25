import { v } from "convex/values";
import { mutation } from "../_generated/server";

const createNote = mutation({
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

        const requesterId = userIdentity.subject;
        const notebook = await ctx.db.get(notebookId);

        if (!notebook) {
            throw new Error("Notebook not found");
        }

        const notebookOwner = notebook.owner;
        if (notebookOwner !== requesterId) {
            throw new Error("You do not have permission to view this notebook");
        }

        const newNoteId = await ctx.db.insert("notes", {
            name,
            description,
            notebookId,
        });

        return newNoteId;
    }
});

const deleteNote = mutation({
    args: {
        noteId: v.id("notes"),
    },

    handler: async (ctx, { noteId }) => {
        const userIdentity = await ctx.auth.getUserIdentity();
        if (!userIdentity) {
            throw new Error("Not authenticated");
        }

        const requesterId = userIdentity.subject;
        const note = await ctx.db.get(noteId);

        if (!note) {
            throw new Error("Note not found");
        }

        const notebook = await ctx.db.get(note.notebookId);
        if (!notebook) {
            throw new Error("Notebook not found");
        }

        const notebookOwner = notebook.owner;
        if (notebookOwner !== requesterId) {
            throw new Error("You do not have permission to view this notebook");
        }

        await ctx.db.delete(noteId);
    }
})

export { createNote, deleteNote }