import { mutation } from "./_generated/server";

const renameField = mutation(async ({ db }) => {
    const items = await db.query("notes").collect();

    for (const item of items) {
        if (item.name && !item.title) {
            await db.patch(item._id, { title: item.name, name: undefined });
        }
    }
})

export { renameField }