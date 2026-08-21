import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const UpdatePostDialog = ({
    open,
    onOpenChange,
    post,
    onUpdateUserPost,
}) => {
    //store updated post content;
    const [updatedContent, setUpdatedContent] = useState("");

    //when dialog opens, load the existing post content;
    useEffect(() => {
        if (post) {
            setUpdatedContent(post.content);
        }
    }, [post]);

    //handle update button;
    const handleUpdate = async () => {
        //no empty post is accepted;
        if (!updatedContent.trim()) return;

        try {
            //send post id + updated content to Feed.jsx;
            await onUpdateUserPost(
                post._id,
                updatedContent.trim()
            );

            console.log("Post id: ", post._id);
            console.log("UpdatedContent: ", updatedContent);

            //close dialog after successful update;
            onOpenChange(false);

        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="sm:max-w-[500px]">

                <DialogHeader>

                    <DialogTitle>
                        Update Post
                    </DialogTitle>

                    <DialogDescription>
                        Make changes to your post and save them.
                    </DialogDescription>

                </DialogHeader>

                <div className="py-4">

                    <Textarea
                        value={updatedContent}
                        onChange={(event) =>
                            setUpdatedContent(event.target.value)
                        }
                        placeholder="Update your post..."
                        className="min-h-32 resize-none"
                    />

                </div>

                <DialogFooter>

                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleUpdate}
                        disabled={!updatedContent.trim()}
                    >
                        Update Post
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
};

export default UpdatePostDialog;