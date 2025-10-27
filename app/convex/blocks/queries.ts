import { v } from "convex/values";
import { query } from "../_generated/server";

const fetchBlocks = query({
    args: {
        noteId: v.id("notes")
    },

    handler: async (ctx, {  noteId }) => {
        
    }
})