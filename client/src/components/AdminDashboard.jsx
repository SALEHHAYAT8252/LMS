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
import logo from "../assets/black-logo.svg";
import { useSelector } from "react-redux";
import Header from "../layout/Header";
import { Users as UsersIcon, BookOpen, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";

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

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { books } = useSelector((state) => state.book);
  const { allBorrowedBooks } = useSelector((state) => state.borrow);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalBorrowedBooks, setTotalBorrowedBooks] = useState(0);
  const [totalReturnedBooks, setTotalReturnedBooks] = useState(0);

  useEffect(() => {
    let numberOfUsers = (users || []).filter((u) => u.role === "User");
    let numberOfAdmins = (users || []).filter((u) => u.role === "Admin");
    setTotalUsers(numberOfUsers.length);
    setTotalAdmin(numberOfAdmins.length);

    let numberOfTotalBorrowedBooks = (allBorrowedBooks || []).filter(
      (book) => book.returnDate === null
    );

    let numberOfTotalReturnedBooks = (allBorrowedBooks || []).filter(
      (book) => book.returnDate != null
    );
    setTotalBorrowedBooks(numberOfTotalBorrowedBooks.length);
    setTotalReturnedBooks(numberOfTotalReturnedBooks.length);
  }, [users, allBorrowedBooks]);

  const data = {
    labels: ["Borrowed Books", "Returned Books"],
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
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          Admin Overview <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Monitor your library's circulation, inventory, and member activity in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Metric Cards + Admin Profile (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* 3 Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Total Users */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Users
                </span>
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <UsersIcon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {totalUsers}
                </h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Active members
                </p>
              </div>
            </div>

            {/* Total Books */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Total Books
                </span>
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {books?.length || 0}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Titles in catalog
                </p>
              </div>
            </div>

            {/* Total Admins */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Admin Staff
                </span>
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {totalAdmin}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  System moderators
                </p>
              </div>
            </div>
          </div>

          {/* Admin Profile Highlight Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 text-white shadow-xl flex flex-col sm:flex-row items-center gap-6 border border-slate-800">
            <div className="relative shrink-0">
              {user?.avatar?.url ? (
                <img
                  src={user.avatar.url}
                  alt="avatar"
                  className="rounded-2xl w-24 h-24 sm:w-28 sm:h-28 object-cover ring-4 ring-white/10 shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg ring-4 ring-white/10">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "A"}
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 mb-2">
                Administrator
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                {user?.name}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                Welcome back to your command center. You have full access to manage books, catalog records, and system users.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Circulation Chart & Statistics (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight mb-1">
              Book Circulation Status
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Breakdown of currently borrowed vs returned books
            </p>
            <div className="max-w-[280px] mx-auto py-2">
              <Pie data={data} options={chartOptions} />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 flex flex-col">
              <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                Borrowed
              </span>
              <span className="text-2xl font-extrabold text-blue-900 mt-1">
                {totalBorrowedBooks}
              </span>
            </div>
            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex flex-col">
              <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                Returned
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

export default AdminDashboard;
