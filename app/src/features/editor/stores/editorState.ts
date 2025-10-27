import { Id } from "@convex/_generated/dataModel";
import { create } from "zustand";

type EditorState = {
    noteId: Id<"notes"> | null;

    updateNoteId: (noteId: Id<"notes">) => void;
    clearNoteId: () => void;
}

const useEditorStateStore = create<EditorState>((set) => ({
    noteId: null,

    updateNoteId: (noteId: Id<"notes">) => set({ noteId }),
    clearNoteId: () => set({ noteId: null }),
}));

export { useEditorStateStore };