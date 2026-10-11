import Logo from "../ui/Logo";
import NavLinks from "../ui/Navlinks";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                {/* Left Section */}
                <div className="flex items-center gap-6">
                    <Logo />

                    {/* Search */}
                    {/* <button
                        onClick={() => navigate("/search")}
                        className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-muted"
                        aria-label="Search developers"
                    >
                        <Search size={22} />
                    </button> */}
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 md:flex">
                    <NavLinks />
                    <UserMenu />
                </div>

                {/* Mobile */}
                <div className="md:hidden">
                    <MobileMenu />
                </div>

            </div>
        </header>
    );
};

export default Navbar;