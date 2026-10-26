import Feed from "./Feed/Feed";
import LeftBar from "../LeftSideBar/LeftBar";

// import { fetchUserPost } from "@/Api/postApi";
// import { fetchLoggedUserDetails } from "@/Api/loggedUser";

const FeedLayout = () => {
    //get accessToken from AuthContext;
    // const { userProfile} = useContext(AuthContext);

    return (
        <section className="mx-auto max-w-7xl px-4 py-6 pb-24 lg:pr-20 lg:pb-6">

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

                <LeftBar
                //now contains the userInfo to be displayed on the leftbar;
                />

                {/* <Feed
                    posts={posts}
                    isLoading={isLoading}
                    onRefreshData={refreshData}
                /> */}

                <Feed />
                {/* <RightBar /> */}

            </div>

        </section>
    );
};

export default FeedLayout;