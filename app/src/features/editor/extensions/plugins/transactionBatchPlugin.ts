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