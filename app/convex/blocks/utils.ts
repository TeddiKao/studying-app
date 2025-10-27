import { Doc } from "../_generated/dataModel";

function convertBlocksToTiptapJSON(blocks: Doc<"blocks">[]) {
    return blocks.map((block) => ({
        type: block.type,
        content: block.content,
        attrs: {
            id: block._id,
            position: block.position,
            ...block.additionalAttributes ?? {},
        }
    }))
}

export { convertBlocksToTiptapJSON };