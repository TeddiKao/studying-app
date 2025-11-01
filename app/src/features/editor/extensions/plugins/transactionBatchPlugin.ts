import { Extension } from "@tiptap/react";
import { Plugin } from "@tiptap/pm/state";

function createTransactionBatchPlugin() {
    return new Plugin({

    })
}

const TransactionBatchPlugin = Extension.create({
    name: "transactionBatchPlugin",
    addProseMirrorPlugins() {
        return [createTransactionBatchPlugin()]
    }
})