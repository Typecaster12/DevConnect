import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import MobileNavLinks from "./MobileNavLinks";

const MobileMenu = () => {
    return (
        <Sheet>

            <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted transition">
                <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] p-6">

                <MobileNavLinks />

            </SheetContent>

        </Sheet>
    );
};

export default MobileMenu;