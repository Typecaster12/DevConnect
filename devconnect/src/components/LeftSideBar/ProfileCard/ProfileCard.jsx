import {
    Card,
    CardContent,
} from "@/components/ui/card";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";

const ProfileCard = ({ userProfile }) => {
    return (
        <Card className="shadow-sm">

            <CardContent className="p-6">
                <ProfileHeader userInfo={userProfile?.personalInfo} />
                <ProfileStats stats={userProfile?.stats} />
                <ProfileActions />
            </CardContent>

        </Card>
    );
};

export default ProfileCard;