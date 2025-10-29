import { Doc, Id } from "../_generated/dataModel";
import type { JSONContent } from "@tiptap/core";

type KnownAttrs = {
	id: Id<"blocks">;
	position: number;
};

type TiptapJSONNode = {
	type: string;
	attrs: KnownAttrs & Record<string, unknown>;
	content?: JSONContent[];
};

type DBBlock = {
	id: Id<"blocks">;
	position: number;
	type: string;
	content: JSONContent[];
	additionalAttributes: Record<string, unknown>;
};

function convertBlocksToTiptapJSON(blocks: Doc<"blocks">[]) {
	return blocks.map((block) => ({
		type: block.type,
		content: block.content,
		attrs: {
			id: block._id,
			position: block.position,
			...(block.additionalAttributes ?? {}),
		},
	}));
}

function convertBlocksToDBFormat(blocks: TiptapJSONNode[]) {
	const dbBlocks: DBBlock[] = [];

	for (const block of blocks) {
		const {
			type,
			content,
			attrs: { id, position, ...additionalAttributes },
		} = block;

		const dbBlock: DBBlock = {
			id,
			position,
			type,
			content: content ?? [],
			additionalAttributes,
		};

		dbBlocks.push(dbBlock);
	}

	return dbBlocks;
}

function removeUndefinedFields(
	obj: Record<string, unknown>
): Partial<Record<string, unknown>> {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined)
	);
}

export { convertBlocksToTiptapJSON, convertBlocksToDBFormat, removeUndefinedFields };
