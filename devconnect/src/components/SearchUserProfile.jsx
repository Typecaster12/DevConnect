import {
  BriefcaseBusiness,
  Code2,
  Globe,
  MapPin,
  MessageCircle,
  UserMinus,
  UserPlus,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useContext, useEffect, useState } from "react";
import { individualUserPosts } from "@/Api/individualUser";
import {
  checkIfUserFollowing,
  followUser,
  unFollowUser,
} from "@/Api/followRelation";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const SearchUserProfile = ({ user }) => {
  const [postsState, setPostsState] = useState({
    userId: null,
    posts: [],
    error: "",
  });
  const [followState, setFollowState] = useState({
    userId: null,
    isFollowing: false,
    initialIsFollowing: false,
    statusKnown: false,
    isLoading: true,
    error: "",
  });
  const { accessToken, loggedUser, refreshLoggedUserData } =
    useContext(AuthContext);

  const { firstName, lastName, username, avatar, headline, bio, location } =
    user.personalInfo;

  const initials = `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

  const socialLinks = [
    { label: "GitHub", url: user.social?.github, icon: Code2 },
    { label: "LinkedIn", url: user.social?.linkedin, icon: BriefcaseBusiness },
    { label: "Portfolio", url: user.social?.portfolio, icon: Globe },
  ].filter((link) => link.url);

  const userId = user._id;
  const isOwnProfile = loggedUser?._id === userId;

  // Fetch this user's posts when their profile is opened.
  useEffect(() => {
    let isCurrentRequest = true;

    const fetchPosts = async () => {
      try {
        const result = await individualUserPosts(userId, accessToken);
        if (isCurrentRequest) {
          setPostsState({
            userId,
            posts: Array.isArray(result.posts) ? result.posts : [],
            error: "",
          });
        }
      } catch (error) {
        if (isCurrentRequest) {
          setPostsState({
            userId,
            posts: [],
            error: error.message || "Failed to fetch user posts.",
          });
        }
      }
    };

    fetchPosts();

    return () => {
      isCurrentRequest = false;
    };
  }, [userId, accessToken]);

  // Check whether the logged-in user already follows this profile.
  useEffect(() => {
    let isCurrentRequest = true;

    const checkFollowStatus = async () => {
      try {
        const result = await checkIfUserFollowing(userId, accessToken);
        if (typeof result.isFollowing !== "boolean") {
          throw new Error("Unable to determine follow status.");
        }

        if (isCurrentRequest) {
          setFollowState({
            userId,
            isFollowing: result.isFollowing,
            initialIsFollowing: result.isFollowing,
            statusKnown: true,
            isLoading: false,
            error: "",
          });
        }
      } catch (error) {
        if (isCurrentRequest) {
          setFollowState({
            userId,
            isFollowing: false,
            initialIsFollowing: false,
            statusKnown: false,
            isLoading: false,
            error: error.message || "Failed to check follow status.",
          });
        }
      }
    };

    checkFollowStatus();

    return () => {
      isCurrentRequest = false;
    };
  }, [userId, accessToken]);

  const handleFollowChange = async () => {
    const nextFollowingState = !followState.isFollowing;

    setFollowState((currentState) => ({
      ...currentState,
      isLoading: true,
      error: "",
    }));

    try {
      if (nextFollowingState) {
        await followUser(userId, accessToken);
      } else {
        await unFollowUser(userId, accessToken);
      }
    } catch (error) {
      setFollowState((currentState) => {
        if (currentState.userId !== userId) return currentState;

        return {
          ...currentState,
          isLoading: false,
          error: error.message || "Unable to update follow status.",
        };
      });
      return;
    }

    setFollowState((currentState) => {
      if (currentState.userId !== userId) return currentState;

      return {
        ...currentState,
        isFollowing: nextFollowingState,
        error: "",
      };
    });

    // Refresh the logged-in user's profile counts after following or unfollowing.
    try {
      await refreshLoggedUserData();
    } catch (error) {
      console.error("Follow status updated, but profile refresh failed:", error);
      setFollowState((currentState) => {
        if (currentState.userId !== userId) return currentState;

        return {
          ...currentState,
          isLoading: false,
          error: "Follow updated, but your profile stats could not be refreshed.",
        };
      });
      return;
    }

    setFollowState((currentState) => {
      if (currentState.userId !== userId) return currentState;

      return {
        ...currentState,
        isLoading: false,
      };
    });
  };

  const isPostsLoading = postsState.userId !== userId;
  const usersPosts = isPostsLoading ? [] : postsState.posts;
  const postsError = isPostsLoading ? "" : postsState.error;
  const isFollowLoading =
    followState.userId !== userId || followState.isLoading;
  const displayedFollowerCount =
    (user.stats?.followers ?? 0) +
    (followState.userId === userId
      ? Number(followState.isFollowing) - Number(followState.initialIsFollowing)
      : 0);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Profile Header */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10 md:gap-14">
        <div className="flex shrink-0 justify-center sm:w-36">
          <Avatar className="size-28 border border-border sm:size-36 md:size-40">
            <AvatarImage
              src={avatar || undefined}
              alt={`${firstName} ${lastName}`}
            />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="min-w-0 flex-1 space-y-5">
          <div className="text-center sm:text-left">
            <h1 className="break-all text-2xl font-semibold tracking-tight sm:text-3xl">
              @{username}
            </h1>
            <p className="mt-3 text-sm font-medium">
              {firstName} {lastName}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm sm:justify-start">
            <p>
              <span className="font-semibold">{user.stats?.posts ?? 0}</span>{" "}
              <span className="text-muted-foreground">posts</span>
            </p>
            <p>
              <span className="font-semibold">{displayedFollowerCount}</span>{" "}
              <span className="text-muted-foreground">followers</span>
            </p>
            <p>
              <span className="font-semibold">{user.stats?.following ?? 0}</span>{" "}
              <span className="text-muted-foreground">following</span>
            </p>
          </div>

          {(headline || bio || location || socialLinks.length > 0) && (
            <div className="space-y-3 text-sm">
              {headline && (
                <p className="text-center font-medium sm:text-left">{headline}</p>
              )}
              {bio && (
                <p className="whitespace-pre-line text-center leading-6 text-muted-foreground sm:text-left">
                  {bio}
                </p>
              )}
              {location && (
                <p className="flex items-center justify-center gap-2 text-muted-foreground sm:justify-start">
                  <MapPin className="size-4 shrink-0" />
                  {location}
                </p>
              )}
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 pt-1 sm:justify-start">
                  {socialLinks.map(({ label, url, icon: Icon }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium transition hover:text-primary hover:underline"
                    >
                      <Icon className="size-4" />
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {!isOwnProfile && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                onClick={handleFollowChange}
                disabled={isFollowLoading || !followState.statusKnown}
              >
                {isFollowLoading ? (
                  "Checking..."
                ) : !followState.statusKnown ? (
                  "Unavailable"
                ) : followState.isFollowing ? (
                  <>
                    <UserMinus />
                    Unfollow
                  </>
                ) : (
                  <>
                    <UserPlus />
                    Follow
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled
                title="Messaging will be available in a future update."
              >
                <MessageCircle />
                Message
              </Button>
            </div>
          )}
          {followState.error && followState.userId === userId && (
            <p className="text-sm text-destructive" role="alert">
              {followState.error}
            </p>
          )}
        </div>
      </section>

      <Separator className="my-8" />

      {/* User posts */}
      <section>
        <div className="flex items-center justify-center gap-8 text-sm font-medium">
          <h2 className="border-t-2 border-primary px-3 py-4">Posts</h2>
        </div>

        {isPostsLoading ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Loading posts...
          </p>
        ) : postsError ? (
          <p className="py-10 text-center text-sm text-destructive">
            {postsError}
          </p>
        ) : usersPosts.length > 0 ? (
          <div className="space-y-5">
            {usersPosts.map((post) => (
              <article
                key={post._id}
                className="rounded-2xl border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src={avatar || undefined}
                      alt={`${firstName} ${lastName}`}
                    />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {firstName} {lastName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @{username}
                      {post.createdAt && (
                        <>
                          {" "}•{" "}
                          {new Date(post.createdAt).toLocaleDateString()}
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <p className="mt-5 whitespace-pre-wrap leading-7">
                  {post.content}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <h3 className="text-lg font-semibold">No posts yet</h3>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              This user&apos;s posts will appear here when they share them.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchUserProfile;
