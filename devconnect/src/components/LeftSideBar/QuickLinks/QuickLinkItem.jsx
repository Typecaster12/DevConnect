import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

const QuickLinkItem = ({ item }) => {
    return (
        <NavLink
            to={item.path}
            className={({ isActive }) =>
                `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                        ? "bg-muted text-primary"
                        : "hover:bg-muted"
                }`
            }
        >
            <span>{item.title}</span>

            <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </NavLink>
    );
};

export default QuickLinkItem;