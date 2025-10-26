import { defineTable } from "convex/server";
import { v } from "convex/values";

const notebooks = defineTable({
	name: v.string(),
	description: v.string(),
	owner: v.string(),
	noteCount: v.number(),
})
	.index("by_owner", ["owner"])
	.index("by_owner_and_name", ["owner", "name"]);

export default notebooks;
