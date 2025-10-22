import { defineSchema } from "convex/server";
import notebooks from "../src/features/notebooks/db/schema";

export default defineSchema({
    notebooks: notebooks
})