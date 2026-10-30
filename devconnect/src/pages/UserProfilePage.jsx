import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { individualUser } from "@/Api/individualUser";
import SearchUserProfile from "@/components/SearchUserProfile";
import { AuthContext } from "@/context/AuthContext";

const UserProfilePage = () => {
  const { id } = useParams();
  const { accessToken } = useContext(AuthContext);
  const [profileState, setProfileState] = useState({
    user: null,
    error: "",
    loadedId: null,
  });

  useEffect(() => {
    let isCurrentRequest = true;

    individualUser(id, accessToken)
      .then((result) => {
        if (isCurrentRequest) {
          setProfileState({
            user: result.userData,
            error: "",
            loadedId: id,
          });
        }
      })
      .catch((error) => {
        if (isCurrentRequest) {
          console.error("Error fetching user profile:", error);
          setProfileState({
            user: null,
            error: error.message || "Failed to fetch user profile.",
            loadedId: id,
          });
        }
      });

    return () => {
      isCurrentRequest = false;
    };
  }, [id, accessToken]);

  const isLoading = profileState.loadedId !== id;

  return (
    <main className="min-h-screen bg-background">
      {isLoading ? (
        <p className="mx-auto max-w-4xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:py-12">
          Loading user profile...
        </p>
      ) : profileState.error ? (
        <p className="mx-auto max-w-4xl px-4 py-8 text-sm text-destructive sm:px-6 lg:py-12">
          {profileState.error}
        </p>
      ) : (
        <SearchUserProfile user={profileState.user} />
      )}
    </main>
  );
};

export default UserProfilePage;
