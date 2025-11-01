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

function createTransactionBatchPlugin(
	editor: Editor,
	bulkCreateBlocks: any,
	noteId: Id<"notes">
) {
	const plugin = new Plugin({
		key: new PluginKey("transactionBatchPlugin"),

		state: {
			init: (): TransactionBatchPluginState => ({
				lastHandledTransactionKey: null,
			}),
			apply(transaction, value) {
				const meta = transaction.getMeta(plugin);

				if (meta?.selfTriggeredTransaction === true) {
					return value;
				}

				if (meta?.transactionKey) {
					console.log("Updating transaction key");
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

			const isSelfTriggeredTransaction = docChanges.some(
				(transaction) => transaction.getMeta(plugin)?.selfTriggeredTransaction
			);

			if (isSelfTriggeredTransaction) {
				return null;
			}

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

			console.log(lastHandledTransactionKey, transactionKey);

			if (lastHandledTransactionKey === transactionKey) {
				return null;
			}

			console.log("Append transaction triggered!");

			const tr = newState.tr.setMeta(plugin, {
				...(newState.tr.getMeta(plugin) ?? {}),
				transactionKey,
			});
			const docSnapshot = tr.doc;

			const { createdNodes, tempIdToNodeMapping } =
				getCreatedNodesFromDocState(docSnapshot);

			if (createdNodes.length === 0) return null;

			setTimeout(async () => {
				const bulkCreateBlocksResult = await bulkCreateBlocks({
					blocks: createdNodes,
					noteId,
				});

				const tempToRealIdMapping = new Map<
					string,
					{ realId: Id<"blocks">; position: number }
				>(Object.entries(bulkCreateBlocksResult));

				for (const [
					tempId,
					{ realId, position },
				] of tempToRealIdMapping) {
					const targetNode = tempIdToNodeMapping.get(tempId);
					if (!targetNode) continue;

					const nodePos = getNodePositionFromDocState(
						docSnapshot,
						targetNode
					);
					if (isNullOrUndefined(nodePos)) continue;

					editor.commands.command(({ tr }) => {
						tr.setMeta(plugin, {
							...(tr.getMeta(plugin) ?? {}),
							selfTriggeredTransaction: true,
						}).setNodeMarkup(nodePos, targetNode.type, {
							...targetNode.attrs,
							id: realId,
							position,
						});

						return true;
					});
				}
			}, 0);

			return tr;
		},
	});

	return plugin;
}

function createTransactionBatchPluginExtension(
	bulkCreateBlocks: any,
	noteId: Id<"notes">
) {
	return Extension.create({
		name: "transactionBatchPlugin",
		addProseMirrorPlugins() {
			return [
				createTransactionBatchPlugin(
					this.editor,
					bulkCreateBlocks,
					noteId
				),
			];
		},
	});
}

export { createTransactionBatchPluginExtension };
