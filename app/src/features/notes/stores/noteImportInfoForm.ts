import { create } from "zustand";

type NoteImportInfoFormStore = {
	isOpen: boolean;
	openForm: () => void;
	closeForm: () => void;

	title: string;
	updateTitle: (title: string) => void;
	clearTitle: () => void;

	description: string;
	updateDescription: (description: string) => void;
	clearDescription: () => void;

	isSubmitting: boolean;
	startSubmitting: () => void;
	stopSubmitting: () => void;

	performFormCleanup: () => void;
};

const useNoteImportInfoFormStore = create<NoteImportInfoFormStore>((set) => ({
	isOpen: false,
	openForm: () => set({ isOpen: true }),
	closeForm: () => set({ isOpen: false }),

	title: "",
	updateTitle: (title: string) => set({ title }),
	clearTitle: () => set({ title: "" }),

	description: "",
	updateDescription: (description: string) => set({ description }),
	clearDescription: () => set({ description: "" }),

	isSubmitting: false,
	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),

	performFormCleanup: () =>
		set({
			isOpen: false,
			isSubmitting: false,
			title: "",
			description: "",
		}),
}));

export { useNoteImportInfoFormStore };
