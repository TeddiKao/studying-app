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

export { useEditNotebookFormStore };
