import { Id } from "@convex/_generated/dataModel";
import { JSONContent } from "@tiptap/react";
import { UUID } from "crypto";

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

type NewlyCreatedTiptapJSONBlock = {
    type: string;
    content: JSONContent[];
    attrs?: Record<string, unknown>;
    tempId: string;
}

export type { DBBlock, TiptapJSONBlock, KnownAttrs, NewlyCreatedTiptapJSONBlock };