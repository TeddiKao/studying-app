import { create } from "zustand";

type CreateNotebookFormState = {
    name: string;
    description: string;

    updateName: (name: string) => void;
    updateDescription: (description: string) => void;
    clearName: () => void;
    clearDescription: () => void;
}

const useCreateNotebookFormStore = create<CreateNotebookFormState>((set) => ({
    name: "",
    description: "",

    updateName: (name: string) => set({ name }),
    updateDescription: (description: string) => set({ description }),

    clearName: () => set({ name: "" }),
    clearDescription: () => set({ description: "" }),
}));

export { useCreateNotebookFormStore };