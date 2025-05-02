import {
  isAuthenticated,
  isAuthorised,
} from "../middlewares/authMiddleware.js";
import {
  addBook,
  deleteBook,
  getAllBooks,
} from "../controllers/bookController.js";
import express from "express";

const router = express.Router();

router.post("/admin/add", isAuthenticated, isAuthorised("Admin"), addBook);

router.get("/all", isAuthenticated, getAllBooks);

router.delete(
  "/admin/delete/:id",
  isAuthenticated,
  isAuthorised("Admin"),
  deleteBook
);

export default router;
