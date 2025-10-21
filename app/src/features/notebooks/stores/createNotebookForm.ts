import { create } from "zustand";

type CreateNotebookFormState = {
    title: string;
    description: string;

    updateTitle: (title: string) => void;
    updateDescription: (description: string) => void;
    clearTitle: () => void;
    clearDescription: () => void;
}

const createNotebookForm = create<CreateNotebookFormState>((set) => ({
    title: "",
    description: "",

    updateTitle: (title: string) => set({ title }),
    updateDescription: (description: string) => set({ description }),

    clearTitle: () => set({ title: "" }),
    clearDescription: () => set({ description: "" }),
}));

export { createNotebookForm };