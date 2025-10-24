import { create } from "zustand";

type NotebookDropdownStore = {
	activeNotebookDropdownId: string | null;

	updateActiveNotebookDropdownId: (notebookDropdownId: string) => void;
	clearActiveNotebookDropdownId: () => void;
};

const useNotebookDropdownStore = create<NotebookDropdownStore>()((set) => ({
	activeNotebookDropdownId: null,

	updateActiveNotebookDropdownId: (notebookDropdownId: string) =>
		set({ activeNotebookDropdownId: notebookDropdownId }),
	clearActiveNotebookDropdownId: () =>
		set({ activeNotebookDropdownId: null }),
}));

export { useNotebookDropdownStore };
