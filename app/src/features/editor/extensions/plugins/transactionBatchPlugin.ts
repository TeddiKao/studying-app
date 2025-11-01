import { Editor, Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import {
	getCreatedNodes,
	getCreatedNodesFromDocState,
} from "../../utils/utils";
import { bulkCreateBlocks } from "@convex/blocks/mutations";
import { Id } from "@convex/_generated/dataModel";

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
			const { createdNodes, tempIdToNodeMapping } =
				getCreatedNodesFromDocState(tr.doc);

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
