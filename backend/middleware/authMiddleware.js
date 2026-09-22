import jwt from "jsonwebtoken";

//this is the validatior layer;
//verify, which user is currently making request;
export const authMiddleWare = async (req, res, next) => {
    try {
        //to verify, which user is currently logedin or making requests
        //we have to take the token and verify the user on that basis;
        // const userToken = req.cookies.token;

        //now we need accessToken sent by frontend;
        const authHeader = req.headers.authorization;
        //testLog;
        console.log("From MiddleWare: ", authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "Failed",
                message: "No access token found, Please login first"
            });
        }

        //extracting actual token;
        const accessToken = authHeader.split(" ")[1];
        console.log("Accesstoken from middleware: ", accessToken);
        // if (!userToken) {
        //     return res.status(401).json({
        //         status: "Failed",
        //         message: "No Token Found, Please login first"
        //     })
        // }

        //verifying user, on the basis of token;
        //here we will take the token of user, and the jwt secret;
        //this will return something like this:
        // {
        //     id: "68b123abc...",
        //     iat: 1756970000,
        //     exp: 1757056400
        // }
        //id is the user's id, iat is the time of token issued to this user, exp = expiration time.
        const decode = jwt.verify(
            accessToken,
            process.env.JWT_SECRET
        );

        //if decode success; store the user's info into the request;
        req.user = decode;

        //continue to the next controller;
        //why this?
        //in our route we will write something like this router("/getprofile", authMiddleware, controller responsible for getting profile)
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);

        res.status(401).json({
            status: "Failed",
            message: "Invalid or expired token"
        })
    }
};