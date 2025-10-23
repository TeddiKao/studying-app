import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

function NotebookDropdown() {
	return (
		<DropdownMenu>
			<DropdownMenuContent side="right" sideOffset={8} align="start">
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default NotebookDropdown;
