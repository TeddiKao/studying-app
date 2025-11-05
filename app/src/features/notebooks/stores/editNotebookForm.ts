import { Id } from "@convex/_generated/dataModel";
import { create } from "zustand";

type EditNotebookFormState = {
	isOpen: boolean;
	isSubmitting: boolean;

	name: string;
	description: string;
	notebookId: Id<"notebooks"> | null;

	openForm: () => void;
	closeForm: () => void;

	updateName: (name: string) => void;
	updateDescription: (description: string) => void;
	clearName: () => void;
	clearDescription: () => void;

	startSubmitting: () => void;
	stopSubmitting: () => void;

	updateNotebookId: (notebookId: Id<"notebooks">) => void;
	clearNotebookId: () => void;

	performFormCleanup: () => void;
};

type EditNotebookFormErrorStore = {
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

const useEditNotebookFormStore = create<EditNotebookFormState>((set) => ({
	isOpen: false,
	isSubmitting: false,

	notebookId: null,
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

	updateNotebookId: (notebookId: Id<"notebooks">) => set({ notebookId }),
	clearNotebookId: () => set({ notebookId: null }),

	performFormCleanup: () =>
		set({ name: "", description: "", notebookId: null, isOpen: false }),
}));

const useEditNotebookFormErrorStore = create<EditNotebookFormErrorStore>((set) => ({
	general: [],
	name: [],
	description: [],

	updateGeneralErrors: (errors: string[]) => set({ general: errors }),
	updateNameErrors: (errors: string[]) => set({ name: errors }),
	updateDescriptionErrors: (errors: string[]) => set({ description: errors }),

	clearGeneralErrors: () => set({ general: [] }),
	clearNameErrors: () => set({ name: [] }),
	clearDescriptionErrors: () => set({ description: [] }),

	clearAllErrors: () => set({ general: [], name: [], description: [] }),
}));

export { useEditNotebookFormStore, useEditNotebookFormErrorStore };
