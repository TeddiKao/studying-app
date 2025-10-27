import { Id } from "@convex/_generated/dataModel"
import { create } from "zustand";

type EditorStore = {
    selectedBlockId: Id<"blocks"> | null;
    updateSelectedBlockId: (id: Id<"blocks">) => void;
    clearSelectedBlockId: () => void;
}

const useEditorStore = create<EditorStore>((set) => ({
    selectedBlockId: null,
    updateSelectedBlockId: (id) => set({ selectedBlockId: id }),
    clearSelectedBlockId: () => set({ selectedBlockId: null }),
}));

export default useEditorStore;