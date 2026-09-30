import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

const ProfileStats = ({ stats }) => {
    const { loggedUser } = useContext(AuthContext);
    console.log("Logged from stats: ", loggedUser);
    return (
        <div className="grid grid-cols-3 gap-4 border-b py-6 text-center">

            <div>

                <h3 className="font-semibold">
                    {loggedUser?.stats.followers}
                </h3>

                <p className="text-xs text-muted-foreground">
                    Followers
                </p>

            </div>

            <div>

                <h3 className="font-semibold">
                    {loggedUser?.stats.following}
                </h3>

                <p className="text-xs text-muted-foreground">
                    Following
                </p>

            </div>

            <div>

                <h3 className="font-semibold">
                    {loggedUser?.stats.posts}
                </h3>

                <p className="text-xs text-muted-foreground">
                    Posts
                </p>

            </div>

        </div>
    );
};

export default ProfileStats;