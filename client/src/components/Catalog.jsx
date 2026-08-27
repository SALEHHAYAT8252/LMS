import React, { useEffect, useState } from "react";
import { RotateCcw, CheckCircle2, Search, AlertTriangle, BookMarked } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleReturnBookPopup } from "../store/slices/popUpSlice";
import { toast } from "react-toastify";
import { fetchAllBooks, resetBookSlice } from "../store/slices/bookSlice";
import {
  fetchAllBorrowedBooks,
  resetBorrowSlice,
} from "../store/slices/borrowSlice";
import ReturnBookPopup from "../popups/ReturnBookPopup";
import Header from "../layout/Header";

const Catalog = () => {
  const dispatch = useDispatch();

  const { returnBookPopup } = useSelector((state) => state.popup);
  const { loading, error, allBorrowedBooks, message } = useSelector(
    (state) => state.borrow
  );
  const { books } = useSelector((state) => state.book);
  const [filter, setFilter] = useState("borrowed");

  const formatDateAndTime = (timeStamp) => {
    if (!timeStamp) return "-";
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;

    const formattedTime = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    return `${formattedDate} • ${formattedTime}`;
  };

  const formatDate = (timeStamp) => {
    if (!timeStamp) return "-";
    const date = new Date(timeStamp);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const currentDate = new Date();

  const borrowedBooks = (allBorrowedBooks || []).filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate > currentDate;
  });

  const overDueBooks = (allBorrowedBooks || []).filter((book) => {
    const dueDate = new Date(book.dueDate);
    return dueDate <= currentDate;
  });

  const [searchedKeyword, setSearchedKeyword] = useState("");
  const handleSearch = (e) => {
    setSearchedKeyword(e.target.value.toLowerCase());
  };

  const activeList = filter === "borrowed" ? borrowedBooks : overDueBooks;
  const booksToDisplay = activeList.filter(
    (book) =>
      book?.user?.email?.toLowerCase().includes(searchedKeyword) ||
      book?.user?.name?.toLowerCase().includes(searchedKeyword)
  );

  const [email, setEmail] = useState("");
  const [borrowedBookId, setBorrowedBookId] = useState("");
  const openReturnBookPopup = (bookId, userEmail) => {
    setBorrowedBookId(bookId);
    setEmail(userEmail);
    dispatch(toggleReturnBookPopup());
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(fetchAllBooks());
      dispatch(fetchAllBorrowedBooks());
      dispatch(resetBookSlice());
      dispatch(resetBorrowSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetBorrowSlice());
    }
  }, [dispatch, error, loading]);

  const bookTitle = (id) => {
    const found = books?.find((b) => b._id === id);
    return found ? found.title : "Unknown Title";
  };

  return (
    <>
      <main className="relative flex-1 p-6 pt-24 max-w-7xl mx-auto">
        <Header />

        {/* Sub Header & Segmented Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Circulation Catalog
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Track borrowed materials, manage overdue loans, and process returns.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by user or email..."
                className="w-full sm:w-60 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-2xs"
                value={searchedKeyword}
                onChange={handleSearch}
              />
            </div>

            {/* Segmented Filter Pills */}
            <div className="bg-slate-200/70 p-1 rounded-xl flex items-center gap-1 shadow-2xs">
              <button
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  filter === "borrowed"
                    ? "bg-white text-blue-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setFilter("borrowed")}
              >
                <BookMarked className="w-3.5 h-3.5" />
                Active Loans ({borrowedBooks.length})
              </button>
              <button
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  filter === "overdue"
                    ? "bg-white text-rose-700 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                onClick={() => setFilter("overdue")}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                Overdue ({overDueBooks.length})
              </button>
            </div>
          </div>
        </div>

        {/* Enterprise Data Table */}
        {booksToDisplay && booksToDisplay.length > 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">#</th>
                    <th className="py-3.5 px-4">Member Name</th>
                    <th className="py-3.5 px-4">Email Address</th>
                    <th className="py-3.5 px-4">Book Title</th>
                    <th className="py-3.5 px-4">Due Date</th>
                    <th className="py-3.5 px-4">Issue Time</th>
                    <th className="py-3.5 px-4 text-center">Return Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {booksToDisplay.map((item, index) => (
                    <tr
                      key={item._id || index}
                      className="hover:bg-slate-50/60 transition-colors duration-150"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {item?.user?.name || "Unknown User"}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500">
                        {item?.user?.email}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {bookTitle(item.book)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                            filter === "overdue"
                              ? "bg-rose-50 text-rose-700 border border-rose-200/60"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {formatDate(item.dueDate)}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {formatDateAndTime(item.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {item.returnDate ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Returned
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              openReturnBookPopup(item.book, item?.user?.email)
                            }
                            title="Process Return"
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-xs font-semibold border border-blue-200 hover:border-blue-600 transition cursor-pointer"
                          >
                            <RotateCcw className="w-3 h-3" /> Return
                          </button>
                        )}
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
              No {filter === "borrowed" ? "Active Loans" : "Overdue Loans"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              There are currently no records found in this view.
            </p>
          </div>
        )}
      </main>

      {returnBookPopup && (
        <ReturnBookPopup bookId={borrowedBookId} email={email} />
      )}
    </>
  );
};

export default Catalog;
