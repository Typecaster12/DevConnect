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

import mockUsers from "@/mock/mockUser";
import DeletePostDialog from "@/components/DialogBoxes/DeletePostDialog";
import { useState } from "react";

const FeedList = ({ posts, onDeleteUserPost }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    return (
        <div className="space-y-5">
            {posts?.map((post) => {
                const author = mockUsers.find(
                    (user) => user.id === post.authorId
                );

                return (
                    <article
                        key={post.id}
                        className="rounded-2xl border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between">
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
                                    <DropdownMenuItem className="cursor-pointer">
                                        <Pencil className="mr-2 h-4 w-4" />
                                        Update Post
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600 focus:text-red-600"
                                        onClick={() => {
                                            setSelectedPostId(post.id);
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

            <DeletePostDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                postId={selectedPostId}
                onDeleteUserPost={onDeleteUserPost}
            />
        </div>
    );
};

export default FeedList;