import { Id } from "@convex/_generated/dataModel"
import { create } from "zustand";

type NoteDropdownState = {
    activeNoteDropdownId: Id<"notes"> | null;

    updateActiveNoteDropdownId: (noteDropdownId: Id<"notes">) => void;
    clearActiveNoteDropdownId: () => void;
}

const useNoteDropdownStore = create<NoteDropdownState>((set) => ({
    activeNoteDropdownId: null,

    updateActiveNoteDropdownId: (noteDropdownId: Id<"notes">) =>
        set({ activeNoteDropdownId: noteDropdownId }),
    clearActiveNoteDropdownId: () => set({ activeNoteDropdownId: null }),
}));

export { useNoteDropdownStore };