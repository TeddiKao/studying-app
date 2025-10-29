import { Doc, Id } from "../_generated/dataModel";
import type { JSONContent } from "@tiptap/core";

type KnownAttrs = {
	id: Id<"blocks">;
	position: number;
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

function convertBlocksToDBFormat(blocks: JSONContent[]) {
	const dbBlocks: DBBlock[] = [];

	for (const block of blocks) {
		const type = block.type as string | undefined;
		const content = block.content ?? [];
		const attrs = (block.attrs ?? {}) as Partial<KnownAttrs> &
			Record<string, unknown>;

		const { id, position, ...additionalAttributes } = attrs;

		// Skip nodes that don't have required identifiers
		if (!id || typeof position !== "number" || !type) continue;

		const dbBlock: DBBlock = {
			id,
			position,
			type,
			content,
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

export {
	convertBlocksToTiptapJSON,
	convertBlocksToDBFormat,
	removeUndefinedFields,
};
