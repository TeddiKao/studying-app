import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { ErrorResponse, SuccessResponse } from "../../src/shared/types/api";
import { Id } from "../_generated/dataModel";

const createNotebook = mutation({
	args: {
		name: v.string(),
		description: v.string(),
	},

	handler: async (
		ctx,
		{ name, description }
	): Promise<ErrorResponse | SuccessResponse> => {
		const userIdentity = await ctx.auth.getUserIdentity();
		if (!userIdentity) {
			throw new Error("Not authenticated");
		}

		const existingNotebooks = await ctx.db
			.query("notebooks")
			.withIndex("by_owner_and_name", (q) =>
				q.eq("owner", userIdentity.subject).eq("name", name)
			)
			.collect();

		if (existingNotebooks.length > 0) {
			return {
				success: false,
				errors: {
					name: ["Notebook with this name already exists"],
				},
			};
		}

		const newNotebookId = await ctx.db.insert("notebooks", {
			name,
			description,
			owner: userIdentity?.subject,
			noteCount: 0,
		});

		return {
            success: true,
            data: {
                notebookId: newNotebookId
            }
        };
	},
});

const editNotebook = mutation({
	args: {
		notebookId: v.id("notebooks"),
		name: v.string(),
		description: v.string(),
	},

	handler: async (
		ctx,
		{ notebookId, name, description }
	): Promise<SuccessResponse | ErrorResponse> => {
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

		const existingNotebooks = await ctx.db
			.query("notebooks")
			.withIndex("by_owner_and_name", (q) =>
				q.eq("owner", userIdentity.subject).eq("name", name)
			)
			.collect();

		if (
			existingNotebooks.filter((notebook) => notebook._id !== notebookId)
				.length > 0
		) {
			return {
				success: false,
				errors: {
					name: ["Notebook with this name already exists"],
				},
			};
		}

		await ctx.db.patch(notebookId, {
			name,
			description,
		});

        return {
            success: true,
        }
	},
});

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
			throw new Error(
				"You do not have permission to delete this notebook"
			);
		}

		const associatedNotes = await ctx.db
			.query("notes")
			.withIndex("by_notebook_id", (q) => q.eq("notebookId", notebookId))
			.collect();

        for (const note of associatedNotes) {
            await ctx.db.delete(note._id);
        }

		await ctx.db.delete(notebookId);
	},
});

export { createNotebook, editNotebook, deleteNotebook };
