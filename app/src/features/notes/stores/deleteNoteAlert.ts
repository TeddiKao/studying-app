import { Id } from "@convex/_generated/dataModel";
import { create } from "zustand";

type DeleteNoteAlertState = {
    isOpen: boolean;
    isDeleting: boolean;
    noteId: Id<"notes"> | null;

    openAlert: () => void;
    closeAlert: () => void;

    startDeleting: () => void;
    stopDeleting: () => void;

    updateNoteId: (noteId: Id<"notes">) => void;
    clearNoteId: () => void;
}

const useDeleteNoteAlertStore = create<DeleteNoteAlertState>((set) => ({
    isOpen: false,
    isDeleting: false,
    noteId: null,

    openAlert: () => set({ isOpen: true }),
    closeAlert: () => set({ isOpen: false }),

    startDeleting: () => set({ isDeleting: true }),
    stopDeleting: () => set({ isDeleting: false }),

    updateNoteId: (noteId: Id<"notes">) => set({ noteId }),
    clearNoteId: () => set({ noteId: null }),
}));

export { useDeleteNoteAlertStore };