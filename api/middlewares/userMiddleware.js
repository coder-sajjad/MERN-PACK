import jwt from "jsonwebtoken";
import createError from "../controllers/errorController.js";

// check user is authenticate
const userMiddleware = (req, res, next) => {

    try {
        const token = req.cookies.access_token;
        // check token
        if(!token){
            return next(createError(401, "You're not authenticated"));
        }

        // If logged in
        const login_user = jwt.verify(token, process.env.JWT_SECRET);
        if(!login_user){
            return next(createError(401, "Invalid token"));
        }

        if(login_user.id !== req.params.id){
            return next(createError(401, "You are not be able to access this features!"));
        }

        if(login_user){
            req.user = login_user;
            next();
        }

    } catch (error) {
        next(error)
    }

};

// export default
export default userMiddleware;