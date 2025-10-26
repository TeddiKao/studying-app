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

const useCreateNoteFormStore = create<CreateNoteFormState>((set) => ({
	isOpen: false,
	isSubmitting: false,

	title: "",
	description: "",

	openForm: () => set({ isOpen: true }),
	closeForm: () => set({ isOpen: false }),

	updateTitle: (name: string) => set({ title: name }),
	updateDescription: (description: string) => set({ description }),

	clearTitle: () => set({ title: "" }),
	clearDescription: () => set({ description: "" }),

	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({ isOpen: false, isSubmitting: false, title: "", description: "" }),
}));

export { useCreateNoteFormStore };
