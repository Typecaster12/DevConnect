import { useEffect, useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import FeedList from "./FeedList";
// import mockUsers from "@/mock/mockUser";
import { createUserPost, fetchUserPost } from "@/Api/postApi";
import LoadingSpinner from "@/components/ui/loadingSpinner";

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true); //for loading state;

    //for fetching data;
    const getPostData = async () => {
        try {
            const data = await fetchUserPost();
            console.log(data);
            //update the post list;
            setPosts(data.posts); //as backend is sending posts:mockPosts which is going to be an array; of posts
        } catch (err) {
            console.error("Error occured while fetching posts: ", err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        //function trigger;
        getPostData();
    }, []);


    //laoding state;
    if (isLoading) {
        return <LoadingSpinner />
    }
    //assuming user 1 is logedin;
    // const currentUser = mockUsers[0]; //Harsh, temp user must be matched, currently user on 0th index is logged in


    //function to handle new post creation;
    const handleCreatePost = async (content) => {
        try {
            await createUserPost(content);
            await getPostData();

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className="relative">

            <div className="sticky top-20 z-20 bg-background pb-6">

                <CreatePost onCreatePost={handleCreatePost} />

            </div>

            <div className="space-y-5">
                <FeedList posts={posts} />
            </div>

        </section>
    );
};

export default Feed;