import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import { BookMarked, RotateCcw, Compass, Quote, ArrowRight } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const { userBorrowedBooks } = useSelector((state) => state.borrow);
  const { user } = useSelector((state) => state.auth);

  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfTotalBorrowedBooks = (userBorrowedBooks || []).filter(
      (book) => book.returned === false
    );

    let numberOfTotalReturnedBooks = (userBorrowedBooks || []).filter(
      (book) => book.returned === true
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [userBorrowedBooks]);

  const data = {
    labels: ["Active Borrows", "Returned Books"],
    datasets: [
      {
        label: "Books",
        data: [totalBorrowedBooks || 0, totalReturnedBooks || 0],
        backgroundColor: ["#3b82f6", "#10b981"],
        borderColor: ["#2563eb", "#059669"],
        borderWidth: 1,
        hoverOffset: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          font: { family: "Plus Jakarta Sans", size: 12, weight: "500" },
          padding: 16,
          color: "#475569",
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 10,
        titleFont: { family: "Plus Jakarta Sans", size: 13 },
        bodyFont: { family: "Plus Jakarta Sans", size: 12 },
        cornerRadius: 8,
      },
    },
  };

  return (
    <main className="relative flex-1 p-6 pt-24 max-w-7xl mx-auto">
      <Header />

      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, {user?.name || "Reader"} 👋
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Explore the digital library collection, view your borrowed books, and track due dates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Action Tiles & Inspiration Quote (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Quick Action Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Active Borrows */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <BookMarked className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    Currently Borrowed
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    {totalBorrowedBooks} <span className="text-xs font-medium text-slate-400">books</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Returned Books */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                  <RotateCcw className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">
                    Returned Books
                  </h4>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    {totalReturnedBooks} <span className="text-xs font-medium text-slate-400">books</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Browse Catalog Promo Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-xl flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-medium backdrop-blur-xs mb-2">
                <Compass className="w-3.5 h-3.5" /> Library Catalog
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                Discover Your Next Favorite Read
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-md">
                Browse our curated collection of books across literature, science, and technology.
              </p>
            </div>
          </div>

          {/* Quote Widget */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden flex flex-col justify-between">
            <Quote className="w-10 h-10 text-slate-100 absolute -top-1 -left-1 transform -rotate-12" />
            <p className="text-slate-700 text-base sm:text-lg font-medium italic relative z-10 leading-relaxed">
              "A reader lives a thousand lives before he dies. The man who never reads lives only one."
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                — George R.R. Martin
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: User Reading Stats Chart (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
              Your Borrowing History
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Visual overview of your active and past book loans
            </p>
            <div className="max-w-[280px] mx-auto py-2">
              <Pie data={data} options={chartOptions} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-col">
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                Active
              </span>
              <span className="text-2xl font-extrabold text-blue-900 mt-1">
                {totalBorrowedBooks}
              </span>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-col">
              <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                Completed
              </span>
              <span className="text-2xl font-extrabold text-emerald-900 mt-1">
                {totalReturnedBooks}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserDashboard;
