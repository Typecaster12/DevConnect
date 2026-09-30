import {
    Card,
    CardContent,
} from "@/components/ui/card";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";

const ProfileCard = () => {
    return (
        <Card className="shadow-sm">

            <CardContent className="p-6">
                <ProfileHeader/>
                <ProfileStats/>
                <ProfileActions />
            </CardContent>

        </Card>
    );
};  

export default ProfileCard;