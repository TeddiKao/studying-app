import { v } from "convex/values";
import { query } from "../_generated/server";
import { convertBlocksToTiptapJSON } from "./utils";

const fetchBlocks = query({
    args: {
        noteId: v.id("notes")
    },

    handler: async (ctx, { noteId }) => {
        const blocks = await ctx.db.query("blocks").withIndex("by_note_id", (q) => (
            q.eq("noteId", noteId)
        )).collect();

        const sortedBlocks = blocks.sort((a, b) => a.position - b.position);

        const tiptapJSONBlocks = convertBlocksToTiptapJSON(sortedBlocks);

        return tiptapJSONBlocks;
    }
})

export { fetchBlocks };