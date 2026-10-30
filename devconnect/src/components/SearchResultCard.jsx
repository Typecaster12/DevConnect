import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Link } from "react-router-dom";

const SearchResultCard = ({ user }) => {
  const { firstName, lastName, username, avatar } = user.personalInfo;
  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  return (
    <Link
      to={`/userProfile/${user._id}`}
      aria-label={`View ${firstName} ${lastName}'s profile`}
      className="flex w-full items-center gap-3 border-b bg-background p-4 text-left transition-colors last:border-b-0 hover:bg-accent"
    >
      <Avatar className="size-10">
        <AvatarImage
          src={avatar || undefined}
          alt={`${firstName} ${lastName}`}
        />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">
          {firstName} {lastName}
        </p>
        <p className="text-sm text-muted-foreground">@{username}</p>
      </div>
    </Link>
  );
};

export default SearchResultCard;
