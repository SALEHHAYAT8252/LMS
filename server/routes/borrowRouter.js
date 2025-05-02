import express from "express";

import {
  borrowedBooks,
  getBorrowedBooksForAdmin,
  recordBorrowedBook,
  returnBorrowBook,
} from "../controllers/borrowController.js";

import {
  isAuthenticated,
  isAuthorised,
} from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post(
  "/record-borrow-book/:id",
  isAuthenticated,
  isAuthorised("Admin"),
  recordBorrowedBook
);

router.get(
  "/borrowed-books-by-users",
  isAuthenticated,
  isAuthorised("Admin"),
  getBorrowedBooksForAdmin
);

router.get(
  "/my-borrowed-books",
  isAuthenticated,
  borrowedBooks
);

router.put("/return-borrowed-book/:bookId",
    isAuthenticated,
    isAuthorised("Admin"),
    returnBorrowBook
)

export default router;