import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";

type TransactionBatchPluginState = {
    lastHandledTransactionKey: string | null;
}

function createTransactionBatchPlugin() {
    const plugin = new Plugin({
        key: new PluginKey("transactionBatchPlugin"),

        state: {
            init: (): TransactionBatchPluginState => ({ lastHandledTransactionKey: null }),
            apply(transaction, value) {
                const meta = transaction.getMeta(plugin);
                if (meta?.transactionKey) {
                    return { lastHandledTransactionKey: meta.transactionKey };
                } else {
                    return value;
                }
            }
        },

        appendTransaction(transactions, oldState, newState) {
            const docChanges = transactions.filter(transaction => transaction.docChanged);
            if (docChanges.length === 0) return null;

            let transactionEvent: "paste" | "drop" | "typing" | null = null;

            const isPaste = docChanges.some(transaction => transaction.getMeta("paste"));
            const isDrop = docChanges.some(transaction => transaction.getMeta("drop"));

            if (isPaste) {
                transactionEvent = "paste";
            } else if (isDrop) {
                transactionEvent = "drop";
            } else {
                transactionEvent = "typing";
            }

            const transactionTimestamp = newState.tr.time;
            const transactionKey = `${transactionEvent}-${transactionTimestamp}`;

            const lastHandledTransactionKey = plugin.getState(newState)?.lastHandledTransactionKey;
            if (lastHandledTransactionKey === transactionKey) {
                return null;
            }

            const tr = newState.tr.setMeta(plugin, { transactionKey })

            console.log("Append transaction running");
            return tr;
        }
    });

    return plugin;
}

const TransactionBatchPlugin = Extension.create({
    name: "transactionBatchPlugin",
    addProseMirrorPlugins() {
        return [createTransactionBatchPlugin()]
    }
})

export { TransactionBatchPlugin }