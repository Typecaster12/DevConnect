import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ProfileHeader = ({userInfo}) => {
    console.log("userInfo: ", userInfo);
    return (
        <div className="flex flex-col items-center text-center border-b pb-6">

            <Avatar className="h-20 w-20">

                <AvatarFallback>
                    <img src={userInfo?.avatar} alt="HM" />
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