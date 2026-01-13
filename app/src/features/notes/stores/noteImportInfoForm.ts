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

type NoteImportInfoFormErrorStore = {
	title: string[];
	updateTitleErrors: (errors: string[]) => void;
	clearTitleErrors: () => void;

	description: string[];
	updateDescriptionErrors: (errors: string[]) => void;
	clearDescriptionErrors: () => void;

	clearAllErrors: () => void;
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

const useNoteImportInfoFormErrorStore = create<NoteImportInfoFormErrorStore>(
	(set) => ({
		title: [],
		updateTitleErrors: (errors: string[]) => set({ title: errors }),
		clearTitleErrors: () => set({ title: [] }),

		description: [],
		updateDescriptionErrors: (errors: string[]) =>
			set({ description: errors }),
		clearDescriptionErrors: () => set({ description: [] }),

		clearAllErrors: () => set({ title: [], description: [] }),
	})
);

export { useNoteImportInfoFormStore };
