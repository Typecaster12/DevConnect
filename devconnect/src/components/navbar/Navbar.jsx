// import Logo from "./Logo";
// import Search from "../ui/Search";
// import NavLinks from "../ui/NavLinks";
// import UserMenu from "./UserMenu";
// import MobileMenu from "./MobileMenu";

import Logo from "../ui/Logo";
import NavLinks from "../ui/Navlinks";
import Search from "../ui/Search";
import MobileMenu from "./MobileMenu";
import UserMenu from "./UserMenu";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                <Logo />

                {/* Desktop Search */}
                <div className="hidden flex-1 px-8 lg:flex">
                    <Search />
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