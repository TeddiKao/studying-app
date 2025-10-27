import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { removeUndefinedFields } from "./utils";

const updateBlock = mutation({
    args: {
        id: v.id("blocks"),
        position: v.optional(v.float64()),
        type: v.optional(v.string()),
        content: v.optional(v.array(v.record(v.string(), v.any()))),
        additionalAttributes: v.optional(v.record(v.string(), v.any())),
    },

    handler: async (ctx, args) => {
        const userIdentity = await ctx.auth.getUserIdentity();

        if (!userIdentity) {
            throw new Error("User not authenticated");
        }

        const fieldsToUpdate = removeUndefinedFields(args);

        const blockId = args.id;
        const block = await ctx.db.get(blockId);

        if (!block) {
            throw new Error("Block not found");
        }

        const noteId = block.noteId;
        const note = await ctx.db.get(noteId);

        if (!note) {
            throw new Error("Note not found");
        }

        const notebookId = note.notebookId;
        const notebook = await ctx.db.get(notebookId);

        if (!notebook) {
            throw new Error("Notebook not found");
        }

        const notebookOwner = notebook.owner;
        const requesterId = userIdentity.subject;

        if (notebookOwner !== requesterId) {
            throw new Error("You are not the owner of this notebook");
        }

        await ctx.db.patch(blockId, fieldsToUpdate);
    }
})