//not for navigation, this is for user's quick accessability;

import { AuthContext } from "@/context/AuthContext";
import ProfileCard from "./ProfileCard/ProfileCard";
import QuickLinks from "./QuickLinks/QuickLinks";
import { useContext } from "react";


// structure =>
// components/
// └── sidebar/
//     │
//     ├── LeftSidebar.jsx          
//     │
//     ├── ProfileCard/
//     │   │
//     │   ├── ProfileCard.jsx      
//     │   ├── ProfileHeader.jsx    
//     │   ├── ProfileStats.jsx     
//     │   └── ProfileFooter.jsx    
//     │
//     └── QuickLinks/
//         │
//         ├── QuickLinks.jsx       
//         ├── QuickLinkItem.jsx    
//         └── quickLinks.js       

// { userProfile }
const LeftSidebar = () => {

    const { loggedUser } = useContext(AuthContext);
    return (
        <aside className="hidden lg:flex flex-col gap-6">

            {loggedUser && (
                <ProfileCard />
            )}

            <QuickLinks />

        </aside>
    );
};
export default LeftSidebar;