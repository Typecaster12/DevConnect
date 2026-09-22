import { useContext } from "react";
import CreatePost from "./CreatePost/CreatePost";
import FeedList from "./FeedList";

import {
    createUserPost,
    deleteUserPost,
    updateUserPost
} from "@/Api/postApi";

import LoadingSpinner from "@/components/ui/loadingSpinner";
import { AuthContext } from "@/context/AuthContext";

const Feed = ({
    posts, //all the posts
    isLoading,
    onRefreshData
}) => {

    //get the accessToken;
    const { accessToken } = useContext(AuthContext);

    //loading state;
    if (isLoading) {
        return <LoadingSpinner />;
    }

    //function to handle new post creation;
    const handleCreatePost = async (content) => {
        try {
            await createUserPost(content, accessToken);

            //ask parent to fetch latest posts + user profile;
            await onRefreshData();

        } catch (error) {
            console.error("Error creating post: ", error);
        }
    };

    //function to handle post deletion;
    const handleDeletePost = async (postId) => {
        try {
            await deleteUserPost(postId, accessToken);

            //ask parent to fetch latest posts + user profile;
            await onRefreshData();

        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    };

    //function to handle post updation;
    const handleUpdatePost = async (postId, newPostContent) => {
        try {
            await updateUserPost(postId, newPostContent, accessToken);

            //ask parent to fetch latest posts + user profile;
            await onRefreshData();

        } catch (error) {
            console.error("Error updating post: ", error);
        }
    };

    return (
        <section className="relative">

            <div className="sticky top-20 z-20 bg-background pb-6">

                <CreatePost
                    onCreatePost={handleCreatePost}
                />

            </div>

            <div className="space-y-5">

                <FeedList
                    posts={posts}
                    onDeleteUserPost={handleDeletePost}
                    onUpdateUserPost={handleUpdatePost}
                />

            </div>

        </section>
    );
};

export default Feed;