"use client";

import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";

type NavIconProps = {
    children: React.ReactNode;
    tooltip: string;
}

function NavIcon({ children, tooltip }: NavIconProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {children}
            </TooltipTrigger>

            <TooltipContent>
                <p>{tooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default NavIcon;