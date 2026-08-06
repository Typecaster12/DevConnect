import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeletePostDialog = ({
    open,
    onOpenChange,
    onDeleteUserPost,
    postId,
}) => {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Delete Post
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure you want to
                        permanently delete this post?
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        className="bg-red-600 hover:bg-red-700"
                        onClick={() => {
                            onDeleteUserPost(postId);
                            onOpenChange(false);
                        }}
                    >
                        Delete
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeletePostDialog;