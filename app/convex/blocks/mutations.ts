import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { removeUndefinedFields } from "./utils";
import { Id } from "../_generated/dataModel";

const bulkCreateBlocks = mutation({
	args: {
		blocks: v.array(
			v.object({
				type: v.string(),
				content: v.array(v.record(v.string(), v.any())),
				additionalAttributes: v.optional(v.record(v.string(), v.any())),
				tempId: v.string(),
				position: v.object({
					relativeTo: v.id("blocks"),
					placement: v.union(v.literal("before"), v.literal("after")),
				}),

				followingBlocks: v.optional(
					v.array(
						v.object({
							type: v.string(),
							content: v.array(v.record(v.string(), v.any())),
							additionalAttributes: v.optional(
								v.record(v.string(), v.any())
							),
							tempId: v.string(),
						})
					)
				),
			})
		),
		noteId: v.id("notes"),
	},

	handler: async (ctx, args) => {
		const userIdentity = await ctx.auth.getUserIdentity();
		if (!userIdentity) {
			throw new Error("User not authenticated");
		}

		const noteId = args.noteId;
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

		const tempToRealIdMap = new Map<string, Id<"blocks">>();

		for (const anchorBlock of args.blocks) {
			const relativeBlockId = anchorBlock.position.relativeTo;
			const relativeBlock = await ctx.db.get(relativeBlockId);

			if (!relativeBlock) {
				throw new Error("Block not found");
			}

			const blocksInNote = await ctx.db
				.query("blocks")
				.withIndex("by_note_id", (q) => q.eq("noteId", noteId))
				.collect();

			const sortedBlocks = blocksInNote.sort((a, b) => {
				if (a.position < b.position) {
					return -1;
				}

				if (a.position > b.position) {
					return 1;
				}

				return 0;
			});

			const relativeBlockIndex = sortedBlocks.findIndex(
				(block) => relativeBlockId === block._id
			);

			let neighbouringBlock = null;
			if (anchorBlock.position.placement === "before") {
				neighbouringBlock = sortedBlocks?.[relativeBlockIndex - 1];
			} else {
				neighbouringBlock = sortedBlocks?.[relativeBlockIndex + 1];
			}

			if (neighbouringBlock) {
				const relativeBlockPosition = neighbouringBlock.position;
				const neighbouringPosition = neighbouringBlock.position;

				const newBlockPosition = (relativeBlockPosition + neighbouringPosition) / 2;
				const newBlockId = await ctx.db.insert("blocks", {
					position: newBlockPosition,
					type: anchorBlock.type,
					content: anchorBlock.content,
					additionalAttributes: anchorBlock.additionalAttributes ?? {},
					noteId,
				});

				tempToRealIdMap.set(anchorBlock.tempId, newBlockId);

				let lastFollowingBlockPosition = newBlockPosition;
				for (const followingBlock of anchorBlock.followingBlocks ?? []) {
					const followingBlockPosition = (lastFollowingBlockPosition + neighbouringPosition) / 2;
					const followingBlockId = await ctx.db.insert("blocks", {
						position: followingBlockPosition,
						type: followingBlock.type,
						content: followingBlock.content,
						additionalAttributes: followingBlock.additionalAttributes ?? {},
						noteId,
					});

					tempToRealIdMap.set(followingBlock.tempId, followingBlockId);
					lastFollowingBlockPosition = followingBlockPosition;
				}
			} else {
				if (anchorBlock.position.placement === "before") {
					throw new Error("Block cannot be placed before title");
				}

				const lastBlockPosition = sortedBlocks[sortedBlocks.length - 1].position;
				const newBlockPosition = lastBlockPosition + 1;
				const newBlockId = await ctx.db.insert("blocks", {
					position: newBlockPosition,
					type: anchorBlock.type,
					content: anchorBlock.content,
					additionalAttributes: anchorBlock.additionalAttributes ?? {},
					noteId,
				});

				tempToRealIdMap.set(anchorBlock.tempId, newBlockId);

				let lastFollowingBlockPosition = newBlockPosition;
				for (const followingBlock of anchorBlock.followingBlocks ?? []) {
					const followingBlockPosition = lastFollowingBlockPosition + 1;
					const followingBlockId = await ctx.db.insert("blocks", {
						position: followingBlockPosition,
						type: followingBlock.type,
						content: followingBlock.content,
						additionalAttributes: followingBlock.additionalAttributes ?? {},
						noteId,
					});

					tempToRealIdMap.set(followingBlock.tempId, followingBlockId);
					lastFollowingBlockPosition = followingBlockPosition;
				}
			}
		}

		return tempToRealIdMap;
	},
});

const updateBlock = mutation({
	args: {
		id: v.id("blocks"),
		position: v.optional(v.float64()),
		type: v.optional(v.string()),
		content: v.optional(v.array(v.record(v.string(), v.any()))),
		additionalAttributes: v.optional(v.record(v.string(), v.any())),
	},

	handler: async (ctx, args) => {
		const { id: blockId, ...fields } = args;
		const userIdentity = await ctx.auth.getUserIdentity();

		if (!userIdentity) {
			throw new Error("User not authenticated");
		}

		const fieldsToUpdate = removeUndefinedFields(fields);
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
	},
});

const bulkUpdateBlocks = mutation({
	args: {
		blocks: v.array(
			v.object({
				id: v.id("blocks"),
				position: v.float64(),
				type: v.string(),
				content: v.array(v.record(v.string(), v.any())),
				additionalAttributes: v.optional(v.record(v.string(), v.any())),
			})
		),
	},

	handler: async (ctx, args) => {
		const userIdentity = await ctx.auth.getUserIdentity();

		if (!userIdentity) {
			throw new Error("User not authenticated");
		}

		const blockIds = new Set<Id<"blocks">>();
		const noteIds = new Set<Id<"notes">>();

		const notesToBlocksMap = new Map<Id<"notes">, Id<"blocks">[]>();

		for (const block of args.blocks) {
			if (!blockIds.has(block.id)) {
				blockIds.add(block.id);
			}

			const blockInstance = await ctx.db.get(block.id);
			if (!blockInstance) {
				throw new Error("Block not found");
			}

			if (!noteIds.has(blockInstance.noteId)) {
				noteIds.add(blockInstance.noteId);
				notesToBlocksMap.set(blockInstance.noteId, [block.id]);
			} else {
				const existingBlocks = notesToBlocksMap.get(
					blockInstance.noteId
				);
				notesToBlocksMap.set(blockInstance.noteId, [
					...(existingBlocks ?? []),
					block.id,
				]);
			}
		}

		for (const [noteId, blockIds] of notesToBlocksMap.entries()) {
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

			for (const blockId of blockIds) {
				const targetBlock = args.blocks.find(
					(block) => block.id === blockId
				);
				if (!targetBlock) {
					throw new Error("Block not found");
				}

				await ctx.db.patch(blockId, {
					position: targetBlock.position,
					type: targetBlock.type,
					content: targetBlock.content,
					additionalAttributes: targetBlock.additionalAttributes,
				});
			}
		}
	},
});

export { bulkCreateBlocks, updateBlock, bulkUpdateBlocks };
