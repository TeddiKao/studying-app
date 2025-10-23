import { create } from "zustand";

type CreateNotebookFormState = {
    isOpen: boolean;
    isSubmitting: boolean;
    
    name: string;
    description: string;
    notebookId: string | null;

    openForm: () => void;
    closeForm: () => void;

    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearName: () => void;
    clearDescription: () => void;

    startSubmitting: () => void;
    stopSubmitting: () => void;

    updateNotebookId: (notebookId: string) => void;
    clearNotebookId: () => void;
}

const useEditNotebookFormStore = create<CreateNotebookFormState>((set) => ({
    isOpen: false,
    isSubmitting: false,

    notebookId: null,
    name: "",
    description: "",

    updateName: (name: string) => set({ name }),
    updateDescription: (description: string) => set({ description }),

    clearName: () => set({ name: "" }),
    clearDescription: () => set({ description: "" }),

    openForm: () => set({ isOpen: true }),
    closeForm: () => set({ isOpen: false }),

    startSubmitting: () => set({ isSubmitting: true }),
    stopSubmitting: () => set({ isSubmitting: false }),

    updateNotebookId: (notebookId: string) => set({ notebookId }),
    clearNotebookId: () => set({ notebookId: null }),
}));

export { useEditNotebookFormStore };