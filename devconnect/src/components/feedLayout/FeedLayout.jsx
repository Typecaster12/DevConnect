import { useContext, useEffect, useState } from "react";

import Feed from "./Feed/Feed";
import LeftBar from "../LeftSideBar/LeftBar";
import RightBar from "../RightSideBar/RightBar";

import { fetchUserPost } from "@/Api/postApi";
import { fetchLoggedUserDetails } from "@/Api/loggedUser";
import { AuthContext } from "@/context/AuthContext";

const FeedLayout = () => {
    //get accessToken from AuthContext;
    const { accessToken } = useContext(AuthContext);

    //lifted state;
    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState(null);

    const [isLoading, setIsLoading] = useState(true); //for loading state;

    //for fetching posts;
    const getPostData = async () => {
        try {
            const data = await fetchUserPost(accessToken);

            //update the post list;
            setPosts(data.posts || []);

        } catch (err) {
            console.error(
                "Error occured while fetching posts: ",
                err.message
            );
        }
    };

    //for fetching logged-in user's details;
    const getLoggedUserData = async () => {
        try {
            const data = await fetchLoggedUserDetails(accessToken);
            //update logged-in user's profile;
            setUserProfile(data.details);

        } catch (err) {
            console.error(
                "Error occured while fetching logged user: ",
                err.message
            );
        }
    };

    //refresh posts + logged-in user's profile;
    const refreshData = async () => {
        await Promise.all([
            getPostData(),
            getLoggedUserData(),
        ]);
    };

    //initial data fetching;
    useEffect(() => {
        if (!accessToken) return;

        const loadData = async () => {
            try {
                await refreshData();
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [accessToken]);

    return (
        <section className="mx-auto max-w-7xl px-4 py-6">

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]">

                <LeftBar
                    userProfile={userProfile} //now contains the userInfo to be displayed on the leftbar;
                />

                <Feed
                    posts={posts}
                    isLoading={isLoading}
                    onRefreshData={refreshData}
                />

                <RightBar />

            </div>

        </section>
    );
};

export default FeedLayout;