import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 text-xl font-bold"
        >
            <Code2 className="h-6 w-6 text-blue-600" />
            <span>DevConnect</span>
        </Link>
    );
};

export default Logo;