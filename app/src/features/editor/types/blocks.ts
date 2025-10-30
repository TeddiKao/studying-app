import { Id } from "@convex/_generated/dataModel";
import { JSONContent } from "@tiptap/react";

type DBBlock = {
	id: Id<"blocks">;
	position: number;
	type: string;
	content: JSONContent[];
	additionalAttributes: Record<string, unknown>;
};

type KnownAttrs = {
	id: Id<"blocks">;
	position: number;
};

type TiptapJSONBlock = {
    type: string;
    content: JSONContent[];
    attrs: KnownAttrs & Record<string, unknown>;
}

export type { DBBlock, TiptapJSONBlock, KnownAttrs };