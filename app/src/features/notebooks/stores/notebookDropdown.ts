import { create } from "zustand";

type NotebookDropdownStore = {
    activeNotebookId: string | null;
    
    updateActiveNotebookId: (notebookId: string) => void;
    clearActiveNotebookId: () => void;
};


const useNotebookDropdownStore = create<NotebookDropdownStore>()((set) => ({
    activeNotebookId: null,

    updateActiveNotebookId: (notebookId: string) => {
        set((state) => ({
            activeNotebookId: notebookId,
        }));
    },

    clearActiveNotebookId: () => {
        set((state) => ({
            activeNotebookId: null,
        }));
    },
}));

export { useNotebookDropdownStore };

