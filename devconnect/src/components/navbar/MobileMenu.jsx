import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import MobileNavLinks from "./MobileNavLinks";

import ProfileCard from "../LeftSideBar/ProfileCard/ProfileCard";
import QuickLinks from "../LeftSideBar/QuickLinks/QuickLinks";
import UsersList from "../RightSideBar/UsersList";

const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-muted">
                <Menu className="h-5 w-5" />
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-[340px] overflow-y-auto p-0"
            >
                <div className="space-y-6 py-6">
                    {/* Navigation */}
                    <div className="px-6">
                        <MobileNavLinks />
                    </div>

                    <div className="border-t" />

                    {/* User Profile */}
                    <div className="px-6">
                        <ProfileCard />
                    </div>

                    {/* Quick Links */}
                    <div className="px-6">
                        <QuickLinks />
                    </div>

                    <div className="border-t" />

                    {/* Suggested Developers */}
                    <div className="px-6 pb-6">
                        <UsersList />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;