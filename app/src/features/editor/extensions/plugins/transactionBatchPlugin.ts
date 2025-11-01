import { Editor, Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import {
	getCreatedNodes,
	getCreatedNodesFromDocState,
    getNodePositionFromDocState,
} from "../../utils/utils";
import { bulkCreateBlocks } from "@convex/blocks/mutations";
import { Id } from "@convex/_generated/dataModel";
import { isNullOrUndefined } from "@/shared/utils/types";
import { Node } from "@tiptap/pm/model";

type TransactionBatchPluginState = {
	lastHandledTransactionKey: string | null;
};

function createTransactionBatchPlugin(editor: Editor, bulkCreateBlocks: any, noteId: Id<"notes">) {
	const plugin = new Plugin({
		key: new PluginKey("transactionBatchPlugin"),

		state: {
			init: (): TransactionBatchPluginState => ({
				lastHandledTransactionKey: null,
			}),
			apply(transaction, value) {
				const meta = transaction.getMeta(plugin);
				if (meta?.transactionKey) {
					return { lastHandledTransactionKey: meta.transactionKey };
				} else {
					return value;
				}
			},
		},

		appendTransaction(transactions, _oldState, newState) {
			const docChanges = transactions.filter(
				(transaction) => transaction.docChanged
			);
			if (docChanges.length === 0) return null;

			let transactionEvent: "paste" | "drop" | "typing" | null = null;

			const isPaste = docChanges.some((transaction) =>
				transaction.getMeta("paste")
			);
			const isDrop = docChanges.some((transaction) =>
				transaction.getMeta("drop")
			);

			if (isPaste) {
				transactionEvent = "paste";
			} else if (isDrop) {
				transactionEvent = "drop";
			} else {
				transactionEvent = "typing";
			}

			const transactionTimestamp = newState.tr.time;
			const transactionKey = `${transactionEvent}-${transactionTimestamp}`;

			const lastHandledTransactionKey =
				plugin.getState(newState)?.lastHandledTransactionKey;
			if (lastHandledTransactionKey === transactionKey) {
				return null;
			}

			const tr = newState.tr.setMeta(plugin, { transactionKey });
            const docSnapshot = tr.doc;

			const { createdNodes, tempIdToNodeMapping } =
				getCreatedNodesFromDocState(docSnapshot);

            setTimeout(() => {
                const bulkCreateBlocksResult = bulkCreateBlocks({
                    blocks: createdNodes,
                    noteId,
                });

                const tempToRealIdMapping = new Map(
                    Object.entries(bulkCreateBlocksResult)
                );

                for (const [tempId, realId] of tempToRealIdMapping) {
                    const targetNode = tempIdToNodeMapping.get(tempId);
                    if (!targetNode) continue;

                    const nodePos = getNodePositionFromDocState(docSnapshot, targetNode);
                    if (isNullOrUndefined(nodePos)) continue;

                    editor.commands.command(({ tr }) => {
                        tr.setNodeMarkup(nodePos, targetNode.type, {
                            ...targetNode.attrs,
                            id: realId
                        })
                        
                        return true;
                    })
                }
            }, 0);

			return tr;
		},
	});

	return plugin;
}

function createTransactionBatchPluginExtension(bulkCreateBlocks: any, noteId: Id<"notes">) {
	return Extension.create({
		name: "transactionBatchPlugin",
		addProseMirrorPlugins() {
			return [createTransactionBatchPlugin(this.editor, bulkCreateBlocks, noteId)];
		},
	});
}

export { createTransactionBatchPluginExtension };
    function getNodePosition(editor: Editor, targetNode: Node) {
        throw new Error("Function not implemented.");
    }

