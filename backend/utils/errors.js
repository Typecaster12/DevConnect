export const getErrorMessage = (error) => {
    console.error(error);

    if (process.env.NODE_ENV === "production") {
        return "Internal server error.";
    }

    return error instanceof Error ? error.message : "Unknown error";
};
