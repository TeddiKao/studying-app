import { defineSchema } from "convex/server";
import notebooks from "./notebooks/schema";
import notes from "./notes/schema";
import blocks from "./blocks/schema";

export default defineSchema({
    notebooks: notebooks,
    notes: notes,
    blocks: blocks
})