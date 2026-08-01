import {
    Card,
    CardContent,
} from "@/components/ui/card";

// import mockUsers from "@/mock/mockUser";
import mockUsers from "@/mock/mockUser";
import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";


const ProfileCard = () => {
    return (
        <Card className="shadow-sm">

            <CardContent className="p-6">

                <ProfileHeader userInfo={mockUsers[0].personalInfo} />

                <ProfileStats stats={mockUsers[0].stats} />

                <ProfileActions />

            </CardContent>

        </Card>
    );
};

export default ProfileCard;