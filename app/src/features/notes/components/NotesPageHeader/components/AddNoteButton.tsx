import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

function AddNoteButton() {
    return (
        <Button type="button">
            <PlusIcon />
            <span>Add note</span>
        </Button>
    )
}

export default AddNoteButton;