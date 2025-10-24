import { defineSchema } from "convex/server";
import notebooks from "./notebooks/schema";

export default defineSchema({
    notebooks: notebooks
})