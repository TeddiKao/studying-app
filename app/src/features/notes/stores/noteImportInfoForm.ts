import { create } from "zustand";

type NoteImportInfoFormStore = {
	title: string;
	updateTitle: (title: string) => void;
	clearTitle: () => void;

	description: string;
	updateDescription: (description: string) => void;
	clearDescription: () => void;

	isSubmitting: boolean;
	startSubmitting: () => void;
	stopSubmitting: () => void;
}

const useNoteImportInfoFormStore = create<NoteImportInfoFormStore>((set) => ({
	title: "",
	updateTitle: (title: string) => set({ title }),
	clearTitle: () => set({ title: "" }),

	description: "",
	updateDescription: (description: string) => set({ description }),
	clearDescription: () => set({ description: "" }),

	isSubmitting: false,
	startSubmitting: () => set({ isSubmitting: true }),
	stopSubmitting: () => set({ isSubmitting: false }),
}))

export { useNoteImportInfoFormStore };