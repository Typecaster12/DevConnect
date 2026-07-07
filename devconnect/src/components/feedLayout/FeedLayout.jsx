import Feed from "./Feed/Feed";
import LeftBar from "../LeftSideBar/LeftBar";
import RightBar from "../RightSideBar/RightBar";

const FeedLayout = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-6">

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] xl:grid-cols-[280px_1fr_320px]">

                <LeftBar />

                <Feed />

                <RightBar />

            </div>

        </section>
    );
};

export default FeedLayout;