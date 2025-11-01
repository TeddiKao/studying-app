import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";

function createTransactionBatchPlugin() {
    return new Plugin({
        key: new PluginKey("transactionBatchPlugin"),

        appendTransaction(transactions, oldState, newState) {
            return null;
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