import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const UserCard = ({ details }) => {
    const { firstName, lastName, avatar, headline } = details.personalInfo;

    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {/* User Info */}
                <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="h-12 w-12 shrink-0">
                        <AvatarImage src={avatar} />
                        <AvatarFallback>
                            {firstName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                        <h3 className="font-semibold leading-tight break-words">
                            {firstName} {lastName}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground break-words">
                            {headline}
                        </p>
                    </div>
                </div>

                {/* Button */}
                <Button
                    size="sm"
                    className="w-full sm:w-auto shrink-0"
                >
                    Add Friend
                </Button>
            </div>
        </div>
    );
};

export default UserCard;