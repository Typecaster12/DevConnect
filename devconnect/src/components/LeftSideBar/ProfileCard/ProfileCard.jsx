import {
    Card,
    CardContent,
} from "@/components/ui/card";

import ProfileHeader from "./ProfileHeader";
import ProfileStats from "./ProfileStats";
import ProfileActions from "./ProfileActions";
// import { fetchLoggedUserDetails } from "@/Api/loggedUser";
// import { useEffect, useState } from "react";
// import LoadingSpinner from "@/components/ui/loadingSpinner";


const ProfileCard = ({ userProfile }) => {
    console.log(userProfile)
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