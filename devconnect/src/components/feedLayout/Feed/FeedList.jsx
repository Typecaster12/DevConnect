import { Heart, MessageCircle, Repeat2, Ellipsis, Pencil, Trash2 } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import DeletePostDialog from "@/components/DialogBoxes/DeletePostDialog";
import UpdatePostDialog from "@/components/DialogBoxes/UpdatePostDialog";
import { useState } from "react";

const FeedList = ({ posts, onDeleteUserPost, onUpdateUserPost }) => {

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);

    //state for update dialog;
    const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="space-y-5">

            {posts?.map((post) => {
                return (
                    <article
                        key={post?._id}
                        className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between">

                            <div className="flex items-center gap-3">

                                <Avatar className="h-12 w-12">

                                    <AvatarImage
                                        src={post?.author.personalInfo.avatar}
                                        alt={`${post?.author.personalInfo.firstName} ${post?.author.personalInfo.lastName}`}
                                    />

                                    <AvatarFallback>
                                        {post?.author.personalInfo.firstName.charAt(0)}
                                        {post?.author.personalInfo.lastName.charAt(0)}
                                    </AvatarFallback>

                                </Avatar>

                                <div>

                                    <h3 className="font-semibold leading-none">
                                        {post?.author.personalInfo.firstName}{" "}
                                        {post?.author.personalInfo.lastName}
                                    </h3>

                                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">

                                        <span>
                                            {post?.author.personalInfo.username}
                                        </span>

                                        <span>•</span>

                                        <span>{post?.createdAt}</span>

                                    </div>

                                </div>

                            </div>

                            {/* Post Options */}
                            <DropdownMenu>

                                <DropdownMenuTrigger asChild>

                                    <button className="rounded-full p-2 transition-colors hover:bg-muted">

                                        <Ellipsis className="h-5 w-5 text-muted-foreground" />

                                    </button>

                                </DropdownMenuTrigger>

                                <DropdownMenuContent
                                    align="end"
                                    className="w-44"
                                >

                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => {
                                            //store the post we want to update;
                                            setSelectedPost(post);
                                            //open update dialog;
                                            setUpdateDialogOpen(true);
                                        }}
                                    >

                                        <Pencil className="mr-2 h-4 w-4" />

                                        Update Post

                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                        onClick={() => {
                                            setSelectedPostId(post?._id);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >

                                        <Trash2 className="mr-2 h-4 w-4" />

                                        Delete Post

                                    </DropdownMenuItem>

                                </DropdownMenuContent>

                            </DropdownMenu>

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

            {/* Delete Post Dialog */}
            <DeletePostDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                postId={selectedPostId}
                onDeleteUserPost={onDeleteUserPost}
            />

            {/* Update Post Dialog */}
            <UpdatePostDialog
                open={updateDialogOpen}
                onOpenChange={setUpdateDialogOpen}
                post={selectedPost}
                onUpdateUserPost={onUpdateUserPost}
            />

        </div>
    );
};

export default FeedList;




// import {
//     Heart,
//     MessageCircle,
//     Repeat2,
//     Ellipsis,
//     Pencil,
//     Trash2,
//     AlertCircle,
//     RefreshCw,
//     FileText,
// } from "lucide-react";

// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/components/ui/avatar";

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//     Card,
//     CardContent,
// } from "@/components/ui/card";

// import { Button } from "@/components/ui/button";

// import {
//     useQuery,
//     useMutation,
//     useQueryClient,
// } from "@tanstack/react-query";

// import { useContext, useState } from "react";
// import { AuthContext } from "@/context/AuthContext";

// import {
//     fetchUserPost,
//     deleteUserPost,
//     updateUserPost,
// } from "@/Api/postApi";

// import DeletePostDialog from "@/components/DialogBoxes/DeletePostDialog";
// import UpdatePostDialog from "@/components/DialogBoxes/UpdatePostDialog";

// const FeedList = () => {
//     const { accessToken, loading: authLoading } = useContext(AuthContext);
//     console.log("AccessToken from feedlist: ", accessToken);
//     const queryClient = useQueryClient();

//     // Dialog states
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [selectedPostId, setSelectedPostId] = useState(null);

//     const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
//     const [selectedPost, setSelectedPost] = useState(null);

//     // Fetch logged-in user's posts
//     const {
//         data,
//         isPending,
//         isError,
//         error,
//         refetch,
//         isFetching,
//     } = useQuery({
//         queryKey: ["myPosts"],
//         queryFn: () => fetchUserPost(accessToken),
//         enabled: !authLoading && !!accessToken,
//     });

//     const posts = data?.posts ?? [];

//     // Delete post mutation
//     const deleteMutation = useMutation({
//         mutationFn: (postId) =>
//             deleteUserPost(postId, accessToken),

//         onSuccess: async () => {
//             await queryClient.invalidateQueries({
//                 queryKey: ["myPosts"],
//             });

//             // Refresh profile data if it uses this query key
//             await queryClient.invalidateQueries({
//                 queryKey: ["loggedUser"],
//             });

//             setDeleteDialogOpen(false);
//             setSelectedPostId(null);
//         },
//     });

//     // Update post mutation
//     const updateMutation = useMutation({
//         mutationFn: ({ postId, newPostContent }) =>
//             updateUserPost(postId, newPostContent, accessToken),

//         onSuccess: async () => {
//             await queryClient.invalidateQueries({
//                 queryKey: ["myPosts"],
//             });

//             setUpdateDialogOpen(false);
//             setSelectedPost(null);
//         },
//     });

//     // Handlers passed to existing dialogs
//     const handleDeleteUserPost = (postId) => {
//         deleteMutation.mutate(postId);
//     };

//     const handleUpdateUserPost = (postId, newPostContent) => {
//         updateMutation.mutate({
//             postId,
//             newPostContent,
//         });
//     };

//     // Authentication loading
//     if (authLoading) {
//         return (
//             <div className="space-y-5">
//                 {[1, 2, 3].map((item) => (
//                     <div
//                         key={item}
//                         className="h-36 w-full animate-pulse rounded-2xl bg-muted"
//                     />
//                 ))}
//             </div>
//         );
//     }

//     // Not authenticated
//     if (!accessToken) {
//         return (
//             <Card>
//                 <CardContent className="py-8 text-center">
//                     Please log in to view your posts.
//                 </CardContent>
//             </Card>
//         );
//     }

//     // Initial loading
//     if (isPending) {
//         return (
//             <div className="space-y-5">
//                 {[1, 2, 3].map((item) => (
//                     <div
//                         key={item}
//                         className="h-36 w-full animate-pulse rounded-2xl bg-muted"
//                     />
//                 ))}
//             </div>
//         );
//     }

//     // Fetch error
//     if (isError) {
//         return (
//             <Card>
//                 <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
//                     <AlertCircle className="h-8 w-8 text-destructive" />

//                     <p className="font-medium">
//                         Failed to load your posts.
//                     </p>

//                     <p className="text-sm text-muted-foreground">
//                         {error?.message || "Something went wrong."}
//                     </p>

//                     <Button
//                         onClick={() => refetch()}
//                         disabled={isFetching}
//                         variant="outline"
//                     >
//                         <RefreshCw
//                             className={`mr-2 h-4 w-4 ${
//                                 isFetching ? "animate-spin" : ""
//                             }`}
//                         />
//                         Retry
//                     </Button>
//                 </CardContent>
//             </Card>
//         );
//     }

//     // Empty state
//     if (posts.length === 0) {
//         return (
//             <Card>
//                 <CardContent className="flex flex-col items-center gap-3 py-10 text-center">
//                     <FileText className="h-10 w-10 text-muted-foreground" />

//                     <h3 className="text-lg font-semibold">
//                         No posts yet
//                     </h3>

//                     <p className="text-sm text-muted-foreground">
//                         Share your first post to get started.
//                     </p>
//                 </CardContent>
//             </Card>
//         );
//     }

//     return (
//         <div className="space-y-5">
//             {posts.map((post) => (
//                 <article
//                     key={post?._id}
//                     className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
//                 >
//                     {/* Header */}
//                     <div className="flex items-start justify-between">
//                         <div className="flex items-center gap-3">
//                             <Avatar className="h-12 w-12">
//                                 <AvatarImage
//                                     src={post?.author?.personalInfo?.avatar}
//                                     alt={`${post?.author?.personalInfo?.firstName ?? ""} ${post?.author?.personalInfo?.lastName ?? ""}`}
//                                 />

//                                 <AvatarFallback>
//                                     {post?.author?.personalInfo?.firstName?.charAt(0)}
//                                     {post?.author?.personalInfo?.lastName?.charAt(0)}
//                                 </AvatarFallback>
//                             </Avatar>

//                             <div>
//                                 <h3 className="font-semibold leading-none">
//                                     {post?.author?.personalInfo?.firstName}{" "}
//                                     {post?.author?.personalInfo?.lastName}
//                                 </h3>

//                                 <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
//                                     <span>
//                                         {post?.author?.personalInfo?.username}
//                                     </span>

//                                     <span>•</span>

//                                     <span>{post?.createdAt}</span>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Post Options */}
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <button className="rounded-full p-2 transition-colors hover:bg-muted">
//                                     <Ellipsis className="h-5 w-5 text-muted-foreground" />
//                                 </button>
//                             </DropdownMenuTrigger>

//                             <DropdownMenuContent align="end" className="w-44">
//                                 <DropdownMenuItem
//                                     className="cursor-pointer"
//                                     onClick={() => {
//                                         setSelectedPost(post);
//                                         setUpdateDialogOpen(true);
//                                     }}
//                                 >
//                                     <Pencil className="mr-2 h-4 w-4" />
//                                     Update Post
//                                 </DropdownMenuItem>

//                                 <DropdownMenuItem
//                                     className="cursor-pointer text-red-600 focus:text-red-600"
//                                     onClick={() => {
//                                         setSelectedPostId(post?._id);
//                                         setDeleteDialogOpen(true);
//                                     }}
//                                 >
//                                     <Trash2 className="mr-2 h-4 w-4" />
//                                     Delete Post
//                                 </DropdownMenuItem>
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     </div>

//                     {/* Content */}
//                     <div className="mt-5">
//                         <p className="whitespace-pre-wrap leading-7 text-foreground">
//                             {post.content}
//                         </p>
//                     </div>

//                     {/* Actions */}
//                     <div className="mt-6 flex items-center gap-8 border-t pt-4">
//                         <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
//                             <Heart className="h-5 w-5" />
//                             <span>Like</span>
//                         </button>

//                         <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
//                             <MessageCircle className="h-5 w-5" />
//                             <span>Comment</span>
//                         </button>

//                         <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
//                             <Repeat2 className="h-5 w-5" />
//                             <span>Share</span>
//                         </button>
//                     </div>
//                 </article>
//             ))}

//             {/* Mutation errors */}
//             {deleteMutation.isError && (
//                 <p className="text-sm text-destructive">
//                     Failed to delete the post. Please try again.
//                 </p>
//             )}

//             {updateMutation.isError && (
//                 <p className="text-sm text-destructive">
//                     Failed to update the post. Please try again.
//                 </p>
//             )}

//             {/* Delete Post Dialog */}
//             <DeletePostDialog
//                 open={deleteDialogOpen}
//                 onOpenChange={setDeleteDialogOpen}
//                 postId={selectedPostId}
//                 onDeleteUserPost={handleDeleteUserPost}
//             />

//             {/* Update Post Dialog */}
//             <UpdatePostDialog
//                 open={updateDialogOpen}
//                 onOpenChange={setUpdateDialogOpen}
//                 post={selectedPost}
//                 onUpdateUserPost={handleUpdateUserPost}
//             />
//         </div>
//     );
// };

// export default FeedList;
