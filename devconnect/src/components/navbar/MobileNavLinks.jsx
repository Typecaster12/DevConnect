//this is for mobile navbar;
//currently hardcoded
import { NavLink } from "react-router-dom";
import {
    House,
    Users,
    Bell,
    Settings,
    User,
} from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const mobileLinks = [
    {
        label: "Feed",
        path: "/",
        icon: House,
    },
    {
        label: "Developers",
        path: "/developers",
        icon: Users,
    },
    {
        label: "Notifications",
        path: "/notifications",
        icon: Bell,
    },
    {
        label: "Settings",
        path: "/settings",
        icon: Settings,
    },
];

const MobileNavLinks = () => {

    const { loggedUser } = useContext(AuthContext);
    //.personalInfo => contains the header info;

    const initials = `${loggedUser?.personalInfo.firstName?.[0] || ""}${loggedUser?.personalInfo.lastName?.[0] || ""}`
        .toUpperCase();

    console.log("loggedUser's details from mobileNavbar: ", loggedUser);
    return (
        <div className="flex flex-col h-full">

            {/* Profile */}

            <div className="border-b pb-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        {initials}
                    </div>

                    <div>

                        <h3 className="font-semibold">
                            {loggedUser?.personalInfo.firstName} {loggedUser?.personalInfo.lastName}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                            {loggedUser?.personalInfo.username}
                        </p>

                    </div>

                </div>

            </div>

            {/* Search */}

            <div className="py-5">

                <input
                    type="text"
                    placeholder="Search developers..."
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
                />

            </div>

            {/* Links */}

            <div className="flex flex-col gap-2">

                {mobileLinks.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-3 py-3 transition ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                                }`
                            }
                        >
                            <Icon size={20} />

                            {item.label}

                        </NavLink>
                    );
                })}

            </div>

        </div>
    );
};

export default MobileNavLinks;