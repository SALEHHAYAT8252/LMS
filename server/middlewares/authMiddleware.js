import jwt from "jsonwebtoken";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import { User } from "../models/userModel.js";

// Middleware to check if the user is authenticated
// and to attach the user object to the request
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // console.log("I am in isAuthenticated middleware");
  const { token } = req.cookies;
  // console.log(token);
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 400));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);
  req.user = await User.findById(decoded.id);
  next();
});


export const isAuthorised = (...roles) => {
  return (req, res, next) => {
    // console.log("I am in isAuthorised middleware",req.user.role);
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`User with this roles (${req.user.role}) not allowed to access this resource`, 403));
    }
    next();
  };
}