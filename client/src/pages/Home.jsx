import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catlog from "../components/Catalog";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import Users from "../components/Users";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="relative md:pl-64 flex flex-col min-h-screen bg-slate-50 text-slate-800">
      {/* Mobile Hamburger Menu Toggle */}
      <div className="md:hidden z-20 absolute right-4 top-3.5 flex justify-center items-center bg-slate-900 shadow-md rounded-xl h-9 w-9 text-white hover:bg-slate-800 transition cursor-pointer">
        <GiHamburgerMenu
          className="text-lg"
          onClick={() => setIsSideBarOpen(!isSideBarOpen)}
        />
      </div>

      <SideBar
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
        setSelectedComponent={setSelectedComponent}
        selectedComponent={selectedComponent}
      />

      <div className="flex-1 w-full max-w-7xl mx-auto">
        {(() => {
          switch (selectedComponent) {
            case "Dashboard":
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
            case "Books":
              return <BookManagement />;
            case "Catlog":
              if (user?.role === "Admin") {
                return <Catlog />;
              }
              return <UserDashboard />;
            case "Users":
              if (user?.role === "Admin") {
                return <Users />;
              }
              return <UserDashboard />;
            case "My Borrowed Books":
              return <MyBorrowedBooks />;
            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()}
      </div>
    </div>
  );
};

export default Home;
