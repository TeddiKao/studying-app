import { defineTable } from "convex/server";
import { v } from "convex/values";

const notebooks = defineTable({
	name: v.string(),
	description: v.optional(v.string()),
	owner: v.string(),
	noteCount: v.number(),
}).index("by_owner", ["owner"]);

export default notebooks;
