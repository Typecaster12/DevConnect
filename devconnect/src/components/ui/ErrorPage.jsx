import { Link, useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <section className="flex min-h-screen items-center justify-center bg-background px-6">
            <div className="w-full max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">

                <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                        <TriangleAlert className="h-10 w-10 text-red-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold tracking-tight">
                    Oops! Something went wrong
                </h1>

                <p className="mt-3 text-muted-foreground">
                    We couldn't find the page you're looking for or an unexpected error
                    occurred.
                </p>

                {error?.statusText || error?.message ? (
                    <div className="mt-6 rounded-lg bg-muted p-4 text-left">
                        <p className="text-sm font-medium text-destructive">
                            {error.statusText || error.message}
                        </p>
                    </div>
                ) : null}

                <div className="mt-8 flex justify-center gap-4">
                    <Link to="/">
                        <Button>
                            Return Home
                        </Button>
                    </Link>

                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>

            </div>
        </section>
    );
};

export default ErrorPage;