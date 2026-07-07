import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import mockUsers from "@/mock/mockUser";

const FeedList = ({ posts }) => {
    if (posts.length === 0) {
        return (
            <div className="rounded-xl border border-dashed p-10 text-center">
                <h2 className="text-xl font-semibold">No posts yet</h2>

                <p className="mt-2 text-muted-foreground">
                    Create your first post to get started.
                </p>
            </div>
        );
    }

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