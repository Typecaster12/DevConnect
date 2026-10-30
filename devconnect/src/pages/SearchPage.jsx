import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchResultCard from "@/components/SearchResultCard";
import { useContext, useEffect, useState } from "react";
import { searchUsers } from "@/Api/searchUsers";
import { AuthContext } from "@/context/AuthContext";

//will implement debouncing in search bar;

//?here we have to use searchUser's method to fetch the user's data;
const SearchPage = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //context
  const { accessToken } = useContext(AuthContext);

  //function to handle searchRequest;
  const handleSearchUsers = async (debouncedQuery, accessToken) => {

    setIsLoading(true); //now loading starts;
    setError("");

    try {
      const resultUsers = await searchUsers(debouncedQuery, accessToken);
      setUsers(resultUsers.usersData || []); //.usersData is containing everything
    } catch (err) {
      setUsers([]);
      setError(err.message || "Failed to fetch users.");
      console.error("Error searching users:", err);
    } finally {
      setIsLoading(false);
    }
  }

  //implementation of debouncing,
  //api call must not be made on every key stroke
  //logoic will wait 300ms, if i such time no extra letter is typed then api call will be made;
  //if in between any new letter is added,, timer again starts from 0;
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); //300ms waiting time;

    //cleanup function;
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);


  //test effect;
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setUsers([]);
      setError("");
      setIsLoading(false);
      return;
    }

    if (!accessToken) return; //must be login;

    //function
    handleSearchUsers(debouncedQuery, accessToken);
  }, [debouncedQuery, accessToken]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 pt-8">

        {/* Sticky Search Bar */}
        <div className="sticky top-4 z-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search people..."
              className="h-12 rounded-2xl border-border bg-background pl-12 pr-4 text-base shadow-sm focus-visible:ring-1"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          {/* Search Results */}
          <div className="mt-3 overflow-hidden rounded-2xl border bg-background shadow-sm">
            {isLoading && <p className="p-4 text-sm text-muted-foreground">Searching users...</p>}

            {error && <p className="p-4 text-sm text-destructive">{error}</p>}

            {!isLoading && !error && debouncedQuery.trim() && users.length === 0 && (
              <p className="p-4 text-sm text-muted-foreground">
                No users found.
              </p>
            )}

            {users.map((user) => (
              <SearchResultCard key={user._id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;