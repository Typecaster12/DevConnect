import {
    Card,
    CardContent,
} from "@/components/ui/card";

import mockUser from "@/mock/mockUser";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";


const ProfileCard = () => {
    return (
        <Card className="shadow-sm">

            <CardContent className="p-6">

                <ProfileHeader userInfo={mockUser.personalInfo} />

                <ProfileStats stats={mockUser.stats}/>

                <ProfileActions />

            </CardContent>

        </Card>
    );
};

export default ProfileCard;