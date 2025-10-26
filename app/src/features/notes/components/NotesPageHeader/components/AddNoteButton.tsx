"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useCreateNoteFormStore } from "../../../stores/createNoteForm";

function AddNoteButton() {
    const { openForm } = useCreateNoteFormStore();

    return (
        <Button className="hover:cursor-pointer" type="button" onClick={openForm}>
            <PlusIcon />
            <span>Add note</span>
        </Button>
    )
}

export default AddNoteButton;