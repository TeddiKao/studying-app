import { create } from "zustand";
import { Id } from "../../../../convex/_generated/dataModel";

type DeleteNotebookAlertState = {
    isOpen: boolean;
    isDeleting: boolean;
    notebookId: Id<"notebooks"> | null;

    openAlert: () => void;
    closeAlert: () => void;

    startDeleting: () => void;
    stopDeleting: () => void;

    updateNotebookId: (notebookId: Id<"notebooks">) => void;
    clearNotebookId: () => void;
}

const useDeleteNotebookAlertStore = create<DeleteNotebookAlertState>((set) => ({
    isOpen: false,
    isDeleting: false,
    notebookId: null,

    openAlert: () => set({ isOpen: true }),
    closeAlert: () => set({ isOpen: false }),

    startDeleting: () => set({ isDeleting: true }),
    stopDeleting: () => set({ isDeleting: false }),

    updateNotebookId: (notebookId: Id<"notebooks">) => set({ notebookId }),
    clearNotebookId: () => set({ notebookId: null }),
}));

export { useDeleteNotebookAlertStore };