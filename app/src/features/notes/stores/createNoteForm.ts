import { create } from "zustand";

type CreateNoteFormState = {
	isOpen: boolean;
	isSubmitting: boolean;

	title: string;
	description: string;

	openForm: () => void;
	closeForm: () => void;

	updateTitle: (title: string) => void;
	updateDescription: (description: string) => void;

	clearTitle: () => void;
	clearDescription: () => void;

	startSubmitting: () => void;
	stopSubmitting: () => void;

	performFormCleanup: () => void;
};

type CreateNoteFormErrorStore = {
	title: string[];
	description: string[];

	updateTitleErrors: (errors: string[]) => void;
	updateDescriptionErrors: (errors: string[]) => void;

	clearTitleErrors: () => void;
	clearDescriptionErrors: () => void;

	clearAllErrors: () => void;
};

const useCreateNoteFormStore = create<CreateNoteFormState>((set) => ({
	isOpen: false,
	isSubmitting: false,

	title: "",
	description: "",

	openForm: () => set({ isOpen: true }),
	closeForm: () => set({ isOpen: false }),

	updateTitle: (title: string) => set({ title: title }),
	updateDescription: (description: string) => set({ description }),

	clearTitle: () => set({ title: "" }),
	clearDescription: () => set({ description: "" }),

	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({ isOpen: false, isSubmitting: false, title: "", description: "" }),
}));

const useCreateNoteFormErrorStore = create<CreateNoteFormErrorStore>((set) => ({
	title: [],
	description: [],

	updateTitleErrors: (errors: string[]) => set({ title: errors }),
	updateDescriptionErrors: (errors: string[]) => set({ description: errors }),

	clearTitleErrors: () => set({ title: [] }),
	clearDescriptionErrors: () => set({ description: [] }),

	clearAllErrors: () => set({ title: [], description: [] }),
}));

export { useCreateNoteFormStore, useCreateNoteFormErrorStore };
