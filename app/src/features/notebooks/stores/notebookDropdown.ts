import { create } from "zustand";

type NotebookDropdownStore = {
	activeNotebookDropdownId: string | null;

	updateActiveNotebookDropdownId: (notebookDropdownId: string) => void;
	clearActiveNotebookDropdownId: () => void;
};

const useNotebookDropdownStore = create<NotebookDropdownStore>()((set) => ({
	activeNotebookDropdownId: null,

	updateActiveNotebookDropdownId: (notebookId: string) =>
		set({ activeNotebookDropdownId: notebookId }),
	clearActiveNotebookDropdownId: () =>
		set({ activeNotebookDropdownId: null }),
}));

export { useNotebookDropdownStore };
