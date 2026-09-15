import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="cursor-pointer">
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>
      <Link
        to="/logout"
        aria-label="Log out"
        title="Log out"
        className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
      >
        <LogOut className="size-4" />
      </Link>
    </div>
  );
};

export default UserMenu;
