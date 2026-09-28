import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

const ProfileHeader = ({ userInfo }) => {
    // console.log("User info from profileHeader: ", userInfo);

    const initials = `${userInfo?.firstName?.[0] || ""}${userInfo?.lastName?.[0] || ""}`
        .toUpperCase();

    return (
        <div className="flex flex-col items-center text-center border-b pb-6">

            <Avatar className="h-20 w-20">

                <AvatarImage
                    src={userInfo?.avatar || undefined}
                    alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
                />

                <AvatarFallback>
                    {initials}
                </AvatarFallback>

            </Avatar>

            <h2 className="mt-4 text-lg font-semibold">
                {userInfo?.firstName} {userInfo?.lastName}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
                {userInfo?.headline}
            </p>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {userInfo?.bio}
            </p>

        </div>
    );
};

export default ProfileHeader;