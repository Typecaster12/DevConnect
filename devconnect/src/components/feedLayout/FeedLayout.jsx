import { useContext, useEffect, useState } from "react";

import Feed from "./Feed/Feed";
import LeftBar from "../LeftSideBar/LeftBar";
import RightBar from "../RightSideBar/RightBar";

// import { fetchUserPost } from "@/Api/postApi";
// import { fetchLoggedUserDetails } from "@/Api/loggedUser";
import { AuthContext } from "@/context/AuthContext";

const FeedLayout = () => {
    //get accessToken from AuthContext;
    // const { userProfile} = useContext(AuthContext);

    return (
        <section className="mx-auto max-w-7xl px-4 py-6">

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]">

                <LeftBar
                //now contains the userInfo to be displayed on the leftbar;
                />

                {/* <Feed
                    posts={posts}
                    isLoading={isLoading}
                    onRefreshData={refreshData}
                /> */}

                <Feed />
                <RightBar />

            </div>

        </section>
    );
};

export default FeedLayout;