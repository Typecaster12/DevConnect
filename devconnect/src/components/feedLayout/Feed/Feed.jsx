import { useContext, useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import FeedList from "./FeedList";
import FeedSidebar from "./FeedSidebar";

import {
    createUserPost,
    deleteUserPost,
    updateUserPost
} from "@/Api/postApi";

import LoadingSpinner from "@/components/ui/loadingSpinner";
import { AuthContext } from "@/context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const Feed = () => {

    //get the accessToken;
    const { accessToken, refreshLoggedUserData, posts, isLoading, refreshData } = useContext(AuthContext);
    const [isComposerOpen, setIsComposerOpen] = useState(false);

    //function to handle new post creation;
    const handleCreatePost = async (content) => {
        try {
            await createUserPost(content, accessToken);

            //ask parent to fetch latest posts + user profile;
            await refreshData();
            await refreshLoggedUserData();
            setIsComposerOpen(false);
        } catch (error) {
            console.error("Error creating post: ", error);
        }
    };

    //function to handle post deletion;
    const handleDeletePost = async (postId) => {
        try {
            await deleteUserPost(postId, accessToken);

            //ask parent to fetch latest posts + user profile;
            await refreshData();
            await refreshLoggedUserData();
        } catch (error) {
            console.error("Error deleting post: ", error);
        }
    };

    //function to handle post updation;
    const handleUpdatePost = async (postId, newPostContent) => {
        try {
            await updateUserPost(postId, newPostContent, accessToken);

            //ask parent to fetch latest posts + user profile;
            await refreshData();

        } catch (error) {
            console.error("Error updating post: ", error);
        }
    };

    return (
        <>
            <FeedSidebar onCreatePost={() => setIsComposerOpen(true)} />

            <Dialog open={isComposerOpen} onOpenChange={setIsComposerOpen}>
                <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
                    <DialogHeader className="sr-only">
                        <DialogTitle>Create a post</DialogTitle>
                    </DialogHeader>
                    <CreatePost onCreatePost={handleCreatePost} />
                </DialogContent>
            </Dialog>

            <section className="relative lg:h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:overscroll-contain">
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="space-y-5">
                        <FeedList
                            posts={posts}
                            onDeleteUserPost={handleDeletePost}
                            onUpdateUserPost={handleUpdatePost}
                        />
                    </div>
                )}
            </section>
        </>
    );
};

export default Feed;