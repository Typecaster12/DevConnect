//not for navigation, this is for user's quick accessability;

import ProfileCard from "./ProfileCard/ProfileCard";
import QuickLinks from "./QuickLinks/QuickLinks";


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


// import ProfileCard from "./ProfileCard/ProfileCard";
// import QuickLinks from "./QuickLinks/QuickLinks";

const LeftSidebar = ({ userProfile }) => {
    console.log("userprofile: ", userProfile);

    return (
        <aside className="hidden lg:flex flex-col gap-6">

            {userProfile && (
                <ProfileCard userProfile={userProfile} />
            )}

            <QuickLinks />

        </aside>
    );
};

// export default LeftSidebar;

export default LeftSidebar;