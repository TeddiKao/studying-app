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
};

type NewlyCreatedTiptapJSONBlock = {
	type: string;
	content: JSONContent[];
	attrs?: Record<string, unknown>;
	tempId: string;
};

type NewlyCreatedTiptapJSONAnchorBlock = NewlyCreatedTiptapJSONBlock & {
	position: {
		relativeTo: Id<"blocks">;
		placement: "before" | "after";
	};

	followingBlocks?: NewlyCreatedTiptapJSONFollowingBlock[];
};

type NewlyCreatedTiptapJSONFollowingBlock = NewlyCreatedTiptapJSONBlock;

export type {
	DBBlock,
	TiptapJSONBlock,
	KnownAttrs,
	NewlyCreatedTiptapJSONAnchorBlock,
	NewlyCreatedTiptapJSONFollowingBlock,
	NewlyCreatedTiptapJSONBlock,
};
