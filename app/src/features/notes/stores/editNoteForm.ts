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

	clearName: () => void;
	clearDescription: () => void;

	startSubmitting: () => void;
	stopSubmitting: () => void;

	performFormCleanup: () => void;

    updateNoteId: (noteId: Id<"notes">) => void;
    clearNoteId: () => void;
};

const useEditNoteFormStore = create<EditNoteFormState>((set) => ({
    isOpen: false,
	isSubmitting: false,

	title: "",
	description: "",

    noteId: null,

    openForm: () => set({ isOpen: true }),
    closeForm: () => set({ isOpen: false }),

	updateTitle: (name: string) => set({ title: name }),
	updateDescription: (description: string) => set({ description }),

	clearName: () => set({ title: "" }),
	clearDescription: () => set({ description: "" }),

	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({ isOpen: false, isSubmitting: false, title: "", description: "", noteId: null }),

    updateNoteId: (noteId: Id<"notes">) => set({ noteId }),
    clearNoteId: () => set({ noteId: null }),
}))

export { useEditNoteFormStore }