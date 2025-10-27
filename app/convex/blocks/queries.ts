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

        const tiptapJSONBlocks = convertBlocksToTiptapJSON(blocks);

        return tiptapJSONBlocks;
    }
})

export { fetchBlocks };