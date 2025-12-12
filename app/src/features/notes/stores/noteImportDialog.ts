import { create } from "zustand";

type NoteImportDialogStore = {
	isOpen: boolean;
	openDialog: () => void;
	closeDialog: () => void;
}

const useNoteImportDialogStore = create<NoteImportDialogStore>((set) => ({
	isOpen: false,
	openDialog: () => set({ isOpen: true }),
	closeDialog: () => set({ isOpen: false }),
}))

export { useNoteImportDialogStore };