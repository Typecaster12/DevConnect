//req will pass through this then after validation pass it will move for furthur process;
export const validateRequest = (schema, property = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[property]);

        if (!result.success) {
            return res.status(400).json({
                status: "Failed",
                message: "Validation failed.",
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        // Replace request data with validated/transformed data
        req[property] = result.data;
        //will work for [req.body, req.params, req.query]

        next();
    };
};