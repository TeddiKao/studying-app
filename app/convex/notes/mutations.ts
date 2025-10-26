import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { ErrorResponse } from "../../src/shared/types/api";
import { Id } from "../_generated/dataModel";

const createNote = mutation({
	args: {
		notebookId: v.id("notebooks"),
		title: v.string(),
		description: v.string(),
	},

	handler: async (
		ctx,
		{ notebookId, title, description }
	): Promise<ErrorResponse | Id<"notes">> => {
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
			throw new Error(
				"You do not have permission to create notes in this notebook"
			);
		}

		const existingNotes = await ctx.db
			.query("notes")
			.withIndex("by_notebook_id_and_title", (q) =>
				q.eq("notebookId", notebookId).eq("title", title)
			)
			.collect();

		if (existingNotes.length > 0) {
			return {};
		}

		const newNoteId = await ctx.db.insert("notes", {
			title,
			description,
			notebookId,
		});

		await ctx.db.patch(notebookId, {
			noteCount: notebook.noteCount + 1,
		});

		return newNoteId;
	},
});

const editNote = mutation({
	args: {
		noteId: v.id("notes"),
		title: v.string(),
		description: v.string(),
	},

	handler: async (ctx, { noteId, title, description }) => {
		const userIdentity = await ctx.auth.getUserIdentity();
		if (!userIdentity) {
			throw new Error("Not authenticated");
		}

		const noteToEdit = await ctx.db.get(noteId);
		if (!noteToEdit) {
			throw new Error("Note not found");
		}

		const notebook = await ctx.db.get(noteToEdit.notebookId);
		if (!notebook) {
			throw new Error("Notebook not found");
		}

		const notebookOwner = notebook.owner;
		if (notebookOwner !== userIdentity.subject) {
			throw new Error("You do not have permission to edit this note");
		}

		await ctx.db.patch(noteId, {
			title,
			description,
		});
	},
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
			throw new Error(
				"You do not have permission to delete notes from this notebook"
			);
		}

		await ctx.db.delete(noteId);

		await ctx.db.patch(note.notebookId, {
			noteCount: notebook.noteCount - 1,
		});
	},
});

export { createNote, editNote, deleteNote };
