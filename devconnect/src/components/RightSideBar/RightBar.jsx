import UsersList from "./UsersList";

const RightBar = () => {
    return (
        <aside className="hidden xl:block w-80">
            <div className="sticky top-20">
                <UsersList />
            </div>
        </aside>
    );
};

export default RightBar;