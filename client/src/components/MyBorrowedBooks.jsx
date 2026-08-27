import React, { useState } from "react";
import { BookOpen, CheckCircle2, Clock, BookMarked } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import Header from "../layout/Header";
import ReadBookPopup from "../popups/ReadBookPopup";

const MyBorrowedBooks = () => {
  const dispatch = useDispatch();

  const { books } = useSelector((state) => state.book);
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { readBookPopup } = useSelector((state) => state.popup);

  const [readBook, setReadBook] = useState({});
  const openReadPopup = (id) => {
    const book = books?.find((b) => b._id === id);
    setReadBook(book);
    dispatch(toggleReadBookPopup());
  };

  const formatDate = (timeStamp) => {
    if (!timeStamp) return "-";
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    return formattedDate;
  };

  const [filter, setFilter] = useState("nonReturned");

  const returnedBooks = (userBorrowedBooks || []).filter((book) => {
    return book.returned === true;
  });

  const nonReturnedBooks = (userBorrowedBooks || []).filter((book) => {
    return book.returned === false;
  });

  const booksToDisplay =
    filter === "returned" ? returnedBooks : nonReturnedBooks;

  return (
    <>
      <main className="relative flex-1 p-6 pt-24 max-w-7xl mx-auto">
        <Header />

        {/* Sub Header & Segmented Switcher */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Borrowed Books
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Keep track of your active borrowings, due dates, and reading history.
            </p>
          </div>

          <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1 shadow-2xs self-start sm:self-auto">
            <button
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                filter === "nonReturned"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setFilter("nonReturned")}
            >
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Active Books ({nonReturnedBooks.length})
            </button>
            <button
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                filter === "returned"
                  ? "bg-white text-emerald-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => setFilter("returned")}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Returned History ({returnedBooks.length})
            </button>
          </div>
        </div>

        {/* Table */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Book Title</th>
                    <th className="py-3.5 px-4">Borrowed On</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {booksToDisplay.map((book, index) => (
                    <tr
                      key={book._id || index}
                      className="hover:bg-slate-50/60 transition-colors duration-150"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {book.booktitle}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        {formatDate(book.borrowedDate)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                          {formatDate(book.dueDate)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {book.returned ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <CheckCircle2 className="w-3 h-3" /> Returned
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                            <Clock className="w-3 h-3" /> Borrowed
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => openReadPopup(book.bookId)}
                          title="View Info"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
            <BookMarked className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">
              No {filter === "returned" ? "returned" : "active"} books found
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {filter === "returned"
                ? "You have not completed any book returns yet."
                : "You currently have no active borrowed books."}
            </p>
          </div>
        )}
      </main>

      {readBookPopup && <ReadBookPopup book={readBook} />}
    </>
  );
};

export default MyBorrowedBooks;
