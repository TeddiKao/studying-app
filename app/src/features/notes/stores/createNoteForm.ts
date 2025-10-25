import { create } from "zustand";

type CreateNoteFormState = {
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
};

const useCreateNoteFormStore = create<CreateNoteFormState>((set) => ({
	isOpen: false,
	isSubmitting: false,

	name: "",
	description: "",

	openForm: () => set({ isOpen: true }),
	closeForm: () => set({ isOpen: false }),

	updateName: (name: string) => set({ name }),
	updateDescription: (description: string) => set({ description }),

	clearName: () => set({ name: "" }),
	clearDescription: () => set({ description: "" }),

	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({ isOpen: false, isSubmitting: false, name: "", description: "" }),
}));

export { useCreateNoteFormStore };