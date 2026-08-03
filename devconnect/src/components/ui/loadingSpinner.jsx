import { LoaderCircle } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex min-h-[60vh] items-center justify-center">

            <div className="flex flex-col items-center gap-4">

                <LoaderCircle className="h-10 w-10 animate-spin text-primary" />

                <p className="text-sm text-muted-foreground">
                    Loading posts...
                </p>

            </div>

        </div>
    );
};

export default LoadingSpinner;