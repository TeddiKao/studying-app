import { fetchMutation } from "convex/nextjs";
import { api } from "@convex/_generated/api";

async function POST(request: Request) {
    const requestBody = await request.json();

    await fetchMutation(api.blocks.mutations.bulkUdpateBlocks, {
        blocks: requestBody.blocks
    })

    return Response.json({ success: true });
}

export { POST };