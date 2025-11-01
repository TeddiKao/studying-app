import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";

type TransactionBatchPluginState = {
    lastHandledTransactionKey: string | null;
}

function createTransactionBatchPlugin() {
    return new Plugin({
        key: new PluginKey("transactionBatchPlugin"),

        state: {
            init: (): TransactionBatchPluginState => ({ lastHandledTransactionKey: null }),
            apply(transaction, value) {
                
            }
        },

        appendTransaction(transactions, oldState, newState) {
            const docChanges = transactions.filter(transaction => transaction.docChanged);
            if (docChanges.length === 0) return null;
        }
    })
}

const TransactionBatchPlugin = Extension.create({
    name: "transactionBatchPlugin",
    addProseMirrorPlugins() {
        return [createTransactionBatchPlugin()]
    }
})

export { TransactionBatchPlugin }