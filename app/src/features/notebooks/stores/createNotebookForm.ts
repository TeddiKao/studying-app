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
};

type CreateNotebookFormErrorStore = {
	general: string[];
	name: string[];
	description: string[];

	updateGeneralErrors: (errors: string[]) => void;
	updateNameErrors: (errors: string[]) => void;
	updateDescriptionErrors: (errors: string[]) => void;

	clearGeneralErrors: () => void;
	clearNameErrors: () => void;
	clearDescriptionErrors: () => void;

	clearAllErrors: () => void;
};

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

const useCreateNotebookFormErrorStore = create<CreateNotebookFormErrorStore>(
	(set) => ({
		general: [],
		name: [],
		description: [],

		updateGeneralErrors: (errors: string[]) => set({ general: errors }),
		updateNameErrors: (errors: string[]) => set({ name: errors }),
		updateDescriptionErrors: (errors: string[]) =>
			set({ description: errors }),

		clearGeneralErrors: () => set({ general: [] }),
		clearNameErrors: () => set({ name: [] }),
		clearDescriptionErrors: () => set({ description: [] }),

		clearAllErrors: () => set({ general: [], name: [], description: [] }),
	})
);

export { useCreateNotebookFormStore, useCreateNotebookFormErrorStore };
