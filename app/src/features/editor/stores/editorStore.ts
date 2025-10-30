import { Id } from "@convex/_generated/dataModel"
import { JSONContent } from "@tiptap/react";
import { create } from "zustand";

type EditorStore = {
    selectedBlockId: Id<"blocks"> | null;
    updateSelectedBlockId: (id: Id<"blocks">) => void;
    clearSelectedBlockId: () => void;

    selectedBlockContent: JSONContent[] | null;
    updateSelectedBlockContent: (content: JSONContent[]) => void;
    clearSelectedBlockContent: () => void;

    selectedBlockOriginalContent: JSONContent[] | null;
    updateSelectedBlockOriginalContent: (content: JSONContent[]) => void;
    clearSelectedBlockOriginalContent: () => void;
}

const useEditorStore = create<EditorStore>((set) => ({
    selectedBlockId: null,
    updateSelectedBlockId: (id) => set({ selectedBlockId: id }),
    clearSelectedBlockId: () => set({ selectedBlockId: null }),

    selectedBlockContent: null,
    updateSelectedBlockContent: (content) => set({ selectedBlockContent: content }),
    clearSelectedBlockContent: () => set({ selectedBlockContent: null }),

    selectedBlockOriginalContent: null,
    updateSelectedBlockOriginalContent: (content) => set({ selectedBlockOriginalContent: content }),
    clearSelectedBlockOriginalContent: () => set({ selectedBlockOriginalContent: null }),
}));

export { useEditorStore };