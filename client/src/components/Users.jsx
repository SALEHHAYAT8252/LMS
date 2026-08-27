import React, { useState } from "react";
import Header from "../layout/Header";
import { useSelector } from "react-redux";
import { Users as UsersIcon, Search, Shield, User as UserIcon, BookMarked } from "lucide-react";

const Users = () => {
  const { users } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const formatDate = (timeStamp) => {
    if (!timeStamp) return "-";
    const date = new Date(timeStamp);
    const formattedDate = `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
    return formattedDate;
  };

  const filteredUsers = (users || [])
    .filter((u) => u.role === "User")
    .filter(
      (u) =>
        u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <main className="relative flex-1 p-6 pt-24 max-w-7xl mx-auto">
      <Header />

      {/* Sub Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Registered Members
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Directory of all registered library students and borrowers.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search member name or email..."
            className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-2xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      {filteredUsers.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">#</th>
                  <th className="py-3.5 px-4">Member Name</th>
                  <th className="py-3.5 px-4">Email Address</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4 text-center">Books Borrowed</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {filteredUsers.map((member, index) => (
                  <tr
                    key={member._id || index}
                    className="hover:bg-slate-50/60 transition-colors duration-150"
                  >
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0">
                        {member.name ? member.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <span>{member.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                      {member.email}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                        <UserIcon className="w-3 h-3 text-slate-500" /> Member
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
                        <BookMarked className="w-3 h-3 text-blue-500" />
                        {member?.borrowedBooks?.length || 0}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {formatDate(member.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center shadow-xs">
          <UsersIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800">No Members Found</h3>
          <p className="text-xs text-slate-500 mt-1">
            {searchQuery
              ? "No registered members match your search criteria."
              : "No registered users in library yet."}
          </p>
        </div>
      )}
    </main>
  );
};

export default Users;
