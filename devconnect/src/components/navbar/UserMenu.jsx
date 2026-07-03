import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

const UserMenu = () => {
  return (
    <Avatar className="cursor-pointer">
      <AvatarFallback>HM</AvatarFallback>
    </Avatar>
  );
};

export default UserMenu;