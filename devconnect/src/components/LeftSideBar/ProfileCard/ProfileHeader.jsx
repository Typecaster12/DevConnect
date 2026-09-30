import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const ProfileHeader = ({ userInfo }) => {
    const { loggedUser } = useContext(AuthContext);

    // console.log("User info from profileHeader: ", userInfo);

    const initials = `${loggedUser?.personalInfo.firstName?.[0] || ""}${loggedUser?.personalInfo.lastName?.[0] || ""}`
        .toUpperCase();

    return (
        <div className="flex flex-col items-center text-center border-b pb-6">

            <Avatar className="h-20 w-20">

                <AvatarImage
                    src={loggedUser?.personalInfo.avatar || undefined}
                    alt={`${loggedUser?.firstName} ${loggedUser?.lastName}`}
                />

                <AvatarFallback>
                    {initials}
                </AvatarFallback>

            </Avatar>

            <h2 className="mt-4 text-lg font-semibold">
                {loggedUser?.personalInfo.firstName} {loggedUser?.personalInfo.lastName}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                {loggedUser?.personalInfo.username}
            </p>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {loggedUser?.bio}
            </p>

        </div>
    );
};

export default ProfileHeader;