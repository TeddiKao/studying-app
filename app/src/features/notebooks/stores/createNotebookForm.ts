import { create } from "zustand";

type CreateNotebookFormState = {
    isOpen: boolean;
    
    name: string;
    description: string;

    openForm: () => void;
    closeForm: () => void;

    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearName: () => void;
    clearDescription: () => void;
}

const useCreateNotebookFormStore = create<CreateNotebookFormState>((set) => ({
    isOpen: false,
    name: "",
    description: "",

    updateName: (name: string) => set({ name }),
    updateDescription: (description: string) => set({ description }),

    clearName: () => set({ name: "" }),
    clearDescription: () => set({ description: "" }),

    openForm: () => set({ isOpen: true }),
    closeForm: () => set({ isOpen: false }),
}));

export { useCreateNotebookFormStore };