import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PostInput from "./PostInput";

const CreatePost = ({onCreatePost}) => {
    return (
        <Card className="shadow-sm">

            <CardHeader className="pb-3">

                <CardTitle className="text-lg">
                    Share an update with the developer community
                </CardTitle>

                <p className="text-sm text-muted-foreground">
                    Share what you're learning, building, or exploring.
                </p>

            </CardHeader>

            <CardContent>

                <PostInput onCreatePost={onCreatePost}/>

            </CardContent>

        </Card>
    );
};

export default CreatePost;