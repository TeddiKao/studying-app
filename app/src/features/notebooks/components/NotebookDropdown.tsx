import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function NotebookDropdown() {
	return (
		<DropdownMenuContent side="right" sideOffset={8} align="start">
			<DropdownMenuItem>Edit</DropdownMenuItem>
			<DropdownMenuItem>Delete</DropdownMenuItem>
		</DropdownMenuContent>
	);
}

export default NotebookDropdown;
