import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProfileActions = () => {
    const navigate = useNavigate();
    return (
        <div className="pt-6">

            <Button
                className="w-full"
                onClick={() => navigate("/userProfile")}
            >
                View Profile
            </Button>

        </div>
    );
};

export default ProfileActions;