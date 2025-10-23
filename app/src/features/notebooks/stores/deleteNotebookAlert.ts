import { create } from "zustand";

type DeleteNotebookAlertState = {
    isOpen: boolean;
    isDeleting: boolean;

    openAlert: () => void;
    closeAlert: () => void;

    startDeleting: () => void;
    stopDeleting: () => void;
}

const useDeleteNotebookAlertStore = create<DeleteNotebookAlertState>((set) => ({
    isOpen: false,
    isDeleting: false,

    openAlert: () => set({ isOpen: true }),
    closeAlert: () => set({ isOpen: false }),

    startDeleting: () => set({ isDeleting: true }),
    stopDeleting: () => set({ isDeleting: false }),
}));

export { useDeleteNotebookAlertStore };