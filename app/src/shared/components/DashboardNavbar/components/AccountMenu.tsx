import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

function AccountMenu() {
	return (
        <DropdownMenuContent side="right" sideOffset={8} align="start" alignOffset={0} className="border-gray-200">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
    );
}

export default AccountMenu;