import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { loggedUser } = useContext(AuthContext);

  const userInfo = loggedUser?.personalInfo;

  const initials = `${userInfo?.firstName?.[0] || ""}${userInfo?.lastName?.[0] || ""}`
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      <Avatar className="cursor-pointer">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>

      {/* Opens the logout page where the user can choose:
          1. Log out from this device
          2. Log out from all devices
      */}
      <Link
        to="/logout"
        aria-label="Log out"
        title="Log out"
        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="size-4" />
      </Link>
    </div>
  );
};

export default UserMenu;