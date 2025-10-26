import { Id } from "@convex/_generated/dataModel";
import { create } from "zustand";

type EditNoteFormState = {
    isOpen: boolean;
	isSubmitting: boolean;

	name: string;
	description: string;

    noteId: Id<"notes"> | null;

	openForm: () => void;
	closeForm: () => void;

	updateName: (name: string) => void;
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

	name: "",
	description: "",

    noteId: null,

    openForm: () => set({ isOpen: true }),
    closeForm: () => set({ isOpen: false }),

	updateName: (name: string) => set({ name }),
	updateDescription: (description: string) => set({ description }),

	clearName: () => set({ name: "" }),
	clearDescription: () => set({ description: "" }),

	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({ isOpen: false, isSubmitting: false, name: "", description: "", noteId: null }),

    updateNoteId: (noteId: Id<"notes">) => set({ noteId }),
    clearNoteId: () => set({ noteId: null }),
}))

export { useEditNoteFormStore }