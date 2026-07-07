import { useState } from "react";
import CreatePost from "./CreatePost/CreatePost";
import mockPosts from "@/mock/mockPosts";
import FeedList from "./FeedList";
// import { mockUsers } from "@/mock/mockPosts";
// import mockUser from "@/mock/mockUser";
import mockUsers from "@/mock/mockUser";

const Feed = () => {
    //assuming user 1 is logedin;
    const currentUser = mockUsers[1]; //Harsh

    //lifted state;
    const [posts, setPosts] = useState(mockPosts);

    //function to handle new post creation;
    const handleCreatePost = (content) => {
        // console.log("input content from Feed.jsx => ", content);
        const newPost = {
            id: crypto.randomUUID(),
            authorId: currentUser.id,             // logged-in user's id
            content,
            createdAt: new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
            }),
        };

        //add new post in array;
        setPosts((prevPosts) => [...prevPosts, newPost]);
    }

    return (
        <section className="relative">

            <div className="sticky top-20 z-20 bg-background pb-6">

                <CreatePost onCreatePost={handleCreatePost} />

            </div>

            <div className="space-y-5">
                <FeedList posts={posts}/>
            </div>

        </section>
    );
};

export default Feed;