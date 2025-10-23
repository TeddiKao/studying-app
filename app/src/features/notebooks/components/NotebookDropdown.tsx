import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function NotebookDropdown() {
	return (
		<DropdownMenuContent className="border-gray-300" side="right" sideOffset={8} align="start">
			<DropdownMenuItem>Edit</DropdownMenuItem>
			<DropdownMenuItem>Delete</DropdownMenuItem>
		</DropdownMenuContent>
	);
}

export default NotebookDropdown;
