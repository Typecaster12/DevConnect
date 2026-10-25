import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Code2, Home, Plus, Search } from "lucide-react";

import { AuthContext } from "@/context/AuthContext";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const FeedSidebar = ({ onCreatePost }) => {
    const { loggedUser } = useContext(AuthContext);
    const userInfo = loggedUser?.personalInfo;
    const initials = `${userInfo?.firstName?.[0] || ""}${userInfo?.lastName?.[0] || ""}`
        .toUpperCase();

    const linkClassName = ({ isActive }) =>
        `flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-accent hover:text-accent-foreground ${
            isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        }`;

    return (
        <aside className="fixed top-16 right-0 bottom-0 z-40 flex w-16 flex-col items-center gap-5 border-l bg-background/95 py-6 text-foreground backdrop-blur-md lg:w-[72px]">
            <NavLink to="/" aria-label="Feed" title="Feed" className={linkClassName}>
                <Home className="size-6" />
            </NavLink>

            <NavLink to="/search" aria-label="Find developers" title="Find developers" className={linkClassName}>
                <Search className="size-6" />
            </NavLink>

            <Button
                type="button"
                variant="ghost"
                size="icon-lg"
                onClick={onCreatePost}
                aria-label="Create a post"
                title="Create a post"
                className="rounded-xl text-foreground hover:bg-accent hover:text-accent-foreground"
            >
                <Plus className="size-7" />
            </Button>

            <NavLink
                to="/userProfile"
                aria-label="Your profile"
                title="Your profile"
                className={({ isActive }) =>
                    `flex size-11 items-center justify-center rounded-full transition-colors hover:bg-accent ${
                        isActive ? "ring-2 ring-primary" : ""
                    }`
                }
            >
                <Avatar className="size-8 border border-border">
                    <AvatarImage
                        src={userInfo?.avatar || undefined}
                        alt="Your profile"
                    />
                    <AvatarFallback className="bg-muted text-xs text-muted-foreground">
                        {initials || <Code2 className="size-4" />}
                    </AvatarFallback>
                </Avatar>
            </NavLink>
        </aside>
    );
};

export default FeedSidebar;
