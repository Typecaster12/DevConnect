
import { useContext } from "react";
import {
    Settings,
    MapPin,
    Globe,
    Pencil,
    Camera,
    Code2,
    BriefcaseBusiness,
    CalendarDays,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/context/AuthContext";
import FeedList from "@/components/feedLayout/Feed/FeedList";
import { deleteUserPost, updateUserPost } from "@/Api/postApi";

const ProfileDetails = () => {
    // const { loggedUser, accessToken } = useContext(AuthContext);
    const { accessToken, refreshLoggedUserData, posts, isLoading, refreshData, loggedUser } = useContext(AuthContext);


    const initials = `${loggedUser?.personalInfo.firstName?.[0] || ""}${loggedUser?.personalInfo.lastName?.[0] || ""}`
        .toUpperCase();


    //check for number of posts;
    const hasPosts = (loggedUser?.stats?.posts ?? 0) > 0;

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
        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
            {/* Profile Header */}
            <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10 md:gap-14">
                {/* Avatar */}
                <div className="flex shrink-0 justify-center sm:w-44 md:w-52">
                    <div className="relative">
                        <Avatar className="h-28 w-28 border border-border sm:h-36 sm:w-36 md:h-40 md:w-40">
                            <AvatarImage
                                src={loggedUser?.personalInfo.avatar || undefined}
                                alt={`${loggedUser?.firstName} ${loggedUser?.lastName}`}
                            />

                            <AvatarFallback className="text-3xl">
                                {initials}
                            </AvatarFallback>
                        </Avatar>

                        <button
                            type="button"
                            aria-label="Add profile note"
                            className="absolute -right-2 -top-2 rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground shadow-sm transition hover:bg-accent hover:text-accent-foreground"
                        >
                            Note...
                        </button>

                        <button
                            type="button"
                            aria-label="Change profile picture"
                            className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background shadow-sm transition hover:bg-accent"
                        >
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="min-w-0 flex-1 space-y-5">
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                        <h1 className="break-all text-2xl font-semibold tracking-tight sm:text-3xl">
                            {loggedUser?.personalInfo.username}
                        </h1>

                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Profile settings"
                        >
                            <Settings className="h-5 w-5" />
                        </Button>
                    </div>

                    <p className="text-center text-sm font-medium sm:text-left">
                        {loggedUser?.personalInfo.firstName} {loggedUser?.personalInfo.lastName}
                    </p>

                    {/* Profile Statistics */}
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm sm:justify-start">
                        <p>
                            <span className="font-semibold">{loggedUser?.stats.posts}</span>{" "}
                            <span className="text-muted-foreground">posts</span>
                        </p>

                        <p>
                            <span className="font-semibold">{loggedUser?.stats.followers}</span>{" "}
                            <span className="text-muted-foreground">followers</span>
                        </p>

                        <p>
                            <span className="font-semibold">{loggedUser?.stats.following}</span>{" "}
                            <span className="text-muted-foreground">following</span>
                        </p>
                    </div>



                    {/* Bio and Details */}
                    <div className="space-y-3 text-sm">
                        <p className="text-center font-medium sm:text-left">
                            {loggedUser?.personalInfo.headline}
                        </p>

                        <p className="max-w-xl whitespace-pre-line text-center leading-6 text-muted-foreground sm:text-left">
                            {loggedUser?.personalInfo.bio}
                        </p>

                        {loggedUser?.personalInfo.location && (
                            <p className="flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                                <MapPin className="h-4 w-4 shrink-0" />
                                {loggedUser?.personalInfo.location}
                            </p>
                        )}

                        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 pt-1 sm:justify-start">
                            <a
                                href={loggedUser?.social.github}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-medium transition hover:text-primary hover:underline"
                            >
                                <Code2 className="h-4 w-4" />
                                GitHub
                            </a>

                            <a
                                href={loggedUser?.social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-medium transition hover:text-primary hover:underline"
                            >
                                <BriefcaseBusiness className="h-4 w-4" />
                                LinkedIn
                            </a>

                            <a
                                href={loggedUser?.social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 font-medium transition hover:text-primary hover:underline"
                            >
                                <Globe className="h-4 w-4" />
                                Portfolio
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Actions */}
            <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button className="w-full gap-2">
                    <Pencil className="h-4 w-4" />
                    Edit profile
                </Button>

                <Button variant="secondary" className="w-full gap-2">
                    <CalendarDays className="h-4 w-4" />
                    View activity
                </Button>
            </section>

            <Separator className="my-8" />

            {/* Profile Content */}
            <section>
                <div className="flex items-center justify-center gap-8 text-sm font-medium">
                    <button
                        type="button"
                        className="border-t-2 border-primary px-3 py-4"
                    >
                        Posts
                    </button>

                    <button
                        type="button"
                        className="px-3 py-4 text-muted-foreground transition hover:text-foreground"
                    >
                        About
                    </button>
                </div>

                {/* Conditionally render posts or empty state */}
                {hasPosts ? (
                    <FeedList
                        posts={posts}
                        onDeleteUserPost={handleDeletePost}
                        onUpdateUserPost={handleUpdatePost}
                    />
                ) : (
                    <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-10 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border">
                            <Pencil className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <h2 className="text-lg font-semibold">
                            Share your first post
                        </h2>

                        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                            Your posts and updates will appear here when you start
                            sharing with your developer community.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProfileDetails;
