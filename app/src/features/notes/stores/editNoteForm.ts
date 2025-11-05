import { Id } from "@convex/_generated/dataModel";
import { create } from "zustand";

type EditNoteFormState = {
    isOpen: boolean;
	isSubmitting: boolean;

	title: string;
	description: string;

    noteId: Id<"notes"> | null;

	openForm: () => void;
	closeForm: () => void;

	updateTitle: (title: string) => void;
	updateDescription: (description: string) => void;

	clearTitle: () => void;
	clearDescription: () => void;

	startSubmitting: () => void;
	stopSubmitting: () => void;

	performFormCleanup: () => void;

    updateNoteId: (noteId: Id<"notes">) => void;
    clearNoteId: () => void;
};

type EditNoteFormErrorStore = {
	title: string[];
	description: string[];

	updateTitleErrors: (errors: string[]) => void;
	updateDescriptionErrors: (errors: string[]) => void;

	clearTitleErrors: () => void;
	clearDescriptionErrors: () => void;

	clearAllErrors: () => void;
};

const useEditNoteFormStore = create<EditNoteFormState>((set) => ({
    isOpen: false,
	isSubmitting: false,

	title: "",
	description: "",

    noteId: null,

    openForm: () => set({ isOpen: true }),
    closeForm: () => set({ isOpen: false }),

	updateTitle: (title: string) => set({ title }),
	updateDescription: (description: string) => set({ description }),

	clearTitle: () => set({ title: "" }),
	clearDescription: () => set({ description: "" }),

	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({ isOpen: false, isSubmitting: false, title: "", description: "", noteId: null }),

    updateNoteId: (noteId: Id<"notes">) => set({ noteId }),
    clearNoteId: () => set({ noteId: null }),
}))

const useEditNoteFormErrorStore = create<EditNoteFormErrorStore>((set) => ({
	title: [],
	description: [],

	updateTitleErrors: (errors: string[]) => set({ title: errors }),
	updateDescriptionErrors: (errors: string[]) => set({ description: errors }),

	clearTitleErrors: () => set({ title: [] }),
	clearDescriptionErrors: () => set({ description: [] }),

	clearAllErrors: () => set({ title: [], description: [] }),
}));

export { useEditNoteFormStore, useEditNoteFormErrorStore };