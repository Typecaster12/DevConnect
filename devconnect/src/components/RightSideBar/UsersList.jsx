import mockUsers from "@/mock/mockUser";
import UserCard from "./UserCard";

const UsersList = ({ mobile = false }) => {
    const loggedUser = mockUsers[0]; // Temporary logged-in user

    return (
        <section
            className={
                mobile
                    ? ""
                    : "rounded-2xl border bg-card shadow-sm"
            }
        >
            {/* Header */}
            <div
                className={
                    mobile
                        ? "pb-4"
                        : "border-b px-5 py-4"
                }
            >
                <h2 className="text-lg font-semibold">
                    Suggested Developers
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Connect with developers in the community.
                </p>
            </div>

            {/* Users */}
            <div
                className={
                    mobile
                        ? "space-y-3"
                        : "divide-y"
                }
            >
                {mockUsers.map((user) => {
                    if (user.id === loggedUser.id) return null;

                    return (
                        <div
                            key={user.id}
                            className={
                                mobile
                                    ? ""
                                    : "px-5 py-4"
                            }
                        >
                            <UserCard details={user} />
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            {!mobile && (
                <div className="border-t px-5 py-4">
                    <button className="text-sm font-medium text-primary transition hover:underline">
                        View all developers
                    </button>
                </div>
            )}
        </section>
    );
};

export default UsersList;