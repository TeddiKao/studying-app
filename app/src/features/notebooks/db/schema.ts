import { defineTable } from "convex/server";
import { v } from "convex/values";
import { unique } from "next/dist/build/utils";

const notebooks = defineTable({
	name: v.string(),
	description: v.string(),
	owner: v.string(),
}).index("by_owner", ["owner"]);

export default notebooks;
