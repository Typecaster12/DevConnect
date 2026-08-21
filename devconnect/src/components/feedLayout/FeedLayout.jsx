import { useEffect, useState } from "react";

import Feed from "./Feed/Feed";
import LeftBar from "../LeftSideBar/LeftBar";
import RightBar from "../RightSideBar/RightBar";

import { fetchUserPost } from "@/Api/postApi";
import { fetchLoggedUserDetails } from "@/Api/loggedUser";

const FeedLayout = () => {
    // console.log("🔥 FeedLayout rendered");
    //lifted state;
    const [posts, setPosts] = useState([]);
    const [userProfile, setUserProfile] = useState(null);

    const [isLoading, setIsLoading] = useState(true); //for loading state;

    //for fetching posts;
    const getPostData = async () => {
        try {
            const data = await fetchUserPost();
            
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
            const data = await fetchLoggedUserDetails();

            //update logged-in user's profile;
            setUserProfile(data.user);

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
        const loadData = async () => {
            try {
                await refreshData();
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <section className="mx-auto max-w-7xl px-4 py-6">

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]">

                <LeftBar
                    userProfile={userProfile}
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