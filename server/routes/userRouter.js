import express from 'express';
import {getAllUsers, registerNewAdmin} from "../controllers/userController.js";
import { isAuthenticated, isAuthorised } from "../middlewares/authMiddleware.js";


const router = express.Router();

// Route to get all users
router.get("/all", isAuthenticated, isAuthorised("Admin"), getAllUsers);

router.post("/add/new-admin", isAuthenticated, isAuthorised("Admin"), registerNewAdmin);

export default router;