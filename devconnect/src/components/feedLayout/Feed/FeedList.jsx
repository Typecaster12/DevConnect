import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import mockUsers from "@/mock/mockUser";
// import { post } from "node_modules/axios/index.cjs";

//here we have to replace react fetching with express's api;
//express api
// import { fetchUserPost } from "@/Api/postApi";
// import { useEffect, useState } from "react";

const FeedList = ({ posts, isLoading }) => {
    // console.log("from express: ", fetchUserPost);
    //will get replaced by tanstack/axios in future once express is done;
    // const [postss, setPostss] = useState();
    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const getPost = async () => {
    //         try {
    //             const data = await fetchUserPost();
    //             // console.log("data is: ", data);
    //             setPostss(data.posts);
    //             // console.log("State data: ", postss)
    //         } catch (err) {
    //             console.log("Some error occured while fetching posts: ", err.message);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }

    //     // console.log("Postss: ", postss);
    //     // console.log("getPost: ", getPost);
    // }, []);

    // if (posts.length === 0) {
    //     return (
    //         <div className="rounded-xl border border-dashed p-10 text-center">
    //             <h2 className="text-xl font-semibold">No posts yet</h2>

    //             <p className="mt-2 text-muted-foreground">
    //                 Create your first post to get started.
    //             </p>
    //         </div>
    //     );
    // }

    // console.log("posts: ", posts)
    // console.log(posts.length)
    return (
        <div className="space-y-5">
            {posts.map((post) => {
                const author = mockUsers.find(
                    (user) => user.id === post.authorId
                );

                return (
                    <article
                        key={post.id}
                        className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage
                                        src={author?.personalInfo.avatar}
                                        alt={`${author?.personalInfo.firstName} ${author?.personalInfo.lastName}`}
                                    />

                                    <AvatarFallback>
                                        {author?.personalInfo.firstName?.charAt(0)}
                                        {author?.personalInfo.lastName?.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <h3 className="font-semibold leading-none">
                                        {author?.personalInfo.firstName}{" "}
                                        {author?.personalInfo.lastName}
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                        <span>
                                            {author?.personalInfo.username}
                                        </span>

                                        <span>•</span>

                                        <span>{post.createdAt}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-5">
                            <p className="whitespace-pre-wrap leading-7 text-foreground">
                                {post.content}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-6 flex items-center gap-8 border-t pt-4">
                            <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                                <Heart className="h-5 w-5" />
                                <span>Like</span>
                            </button>

                            <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                                <MessageCircle className="h-5 w-5" />
                                <span>Comment</span>
                            </button>

                            <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                                <Repeat2 className="h-5 w-5" />
                                <span>Share</span>
                            </button>
                        </div>
                    </article>
                );
            })}
        </div>
    );
};

export default FeedList;