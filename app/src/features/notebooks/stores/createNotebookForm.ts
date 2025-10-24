import { create } from "zustand";

type CreateNotebookFormState = {
    isOpen: boolean;
    isSubmitting: boolean;
    
    name: string;
    description: string;

    openForm: () => void;
    closeForm: () => void;

    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearName: () => void;
    clearDescription: () => void;

    startSubmitting: () => void;
    stopSubmitting: () => void;

    performFormCleanup: () => void;
}

const useCreateNotebookFormStore = create<CreateNotebookFormState>((set) => ({
    isOpen: false,
    isSubmitting: false,
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

    performFormCleanup: () => set({ name: "", description: "", isOpen: false }),
}));

export { useCreateNotebookFormStore };