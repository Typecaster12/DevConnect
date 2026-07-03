import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="relative w-full max-w-md">

      <SearchIcon
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        placeholder="Search developers..."
        className="pl-10"
      />

    </div>
  );
};

export default Search;