import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

function AccountMenu() {
	return (
        <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default AccountMenu;