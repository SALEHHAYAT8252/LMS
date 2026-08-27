import React, { useEffect } from "react";
import logo_with_title from "../assets/logo-with-title.svg";
import logoutIcon from "../assets/logout.png";
import closeIcon from "../assets/white-close-icon.png";
import dashboardIcon from "../assets/element.png";
import bookIcon from "../assets/book.png";
import catalogIcon from "../assets/catalog.png";
import settingIcon from "../assets/setting-white.png";
import usersIcon from "../assets/people.png";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slices/popUpSlice";
import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup";

const SideBar = ({ isSideBarOpen, setIsSideBarOpen, setSelectedComponent, selectedComponent }) => {
  const dispatch = useDispatch();
  const { addNewAdminPopup, settingPopup } = useSelector((state) => state.popup);

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  const activeTab = selectedComponent || "Dashboard";

  const getNavButtonClass = (tabName) => {
    const isActive = activeTab === tabName;
    return `w-full py-2.5 px-3.5 font-medium rounded-xl transition-all duration-200 hover:cursor-pointer flex items-center space-x-3 text-sm ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold"
        : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
    }`;
  };

  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } z-30 transition-all duration-300 md:relative md:left-0 flex w-64 bg-slate-900 border-r border-slate-800/80 text-white flex-col h-full shadow-2xl md:shadow-none`}
        style={{ position: "fixed" }}
      >
        {/* Brand Header */}
        <div className="px-6 py-6 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo_with_title} alt="ByteBooks Logo" className="w-40 object-contain drop-shadow" />
          </div>
          <button
            onClick={() => setIsSideBarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <img src={closeIcon} alt="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Main Menu
          </div>

          <button
            className={getNavButtonClass("Dashboard")}
            onClick={() => {
              setSelectedComponent("Dashboard");
              setIsSideBarOpen(false);
            }}
          >
            <img src={dashboardIcon} alt="icon" className="w-5 h-5 opacity-90" />
            <span>Dashboard</span>
          </button>

          <button
            className={getNavButtonClass("Books")}
            onClick={() => {
              setSelectedComponent("Books");
              setIsSideBarOpen(false);
            }}
          >
            <img src={bookIcon} alt="icon" className="w-5 h-5 opacity-90" />
            <span>Books</span>
          </button>

          {isAuthenticated && user?.role === "Admin" && (
            <>
              <div className="pt-4 px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Administration
              </div>

              <button
                className={getNavButtonClass("Catlog")}
                onClick={() => {
                  setSelectedComponent("Catlog");
                  setIsSideBarOpen(false);
                }}
              >
                <img src={catalogIcon} alt="icon" className="w-5 h-5 opacity-90" />
                <span>Catalog</span>
              </button>

              <button
                className={getNavButtonClass("Users")}
                onClick={() => {
                  setSelectedComponent("Users");
                  setIsSideBarOpen(false);
                }}
              >
                <img src={usersIcon} alt="icon" className="w-5 h-5 opacity-90" />
                <span>Users</span>
              </button>

              <button
                className="w-full py-2.5 px-3.5 font-medium rounded-xl text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all duration-200 hover:cursor-pointer flex items-center space-x-3 text-sm"
                onClick={() => dispatch(toggleAddNewAdminPopup())}
              >
                <RiAdminFill className="w-5 h-5 text-blue-400" />
                <span>Add New Admin</span>
              </button>
            </>
          )}

          {isAuthenticated && user?.role === "User" && (
            <>
              <div className="pt-4 px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                My Library
              </div>
              <button
                className={getNavButtonClass("My Borrowed Books")}
                onClick={() => {
                  setSelectedComponent("My Borrowed Books");
                  setIsSideBarOpen(false);
                }}
              >
                <img src={catalogIcon} alt="icon" className="w-5 h-5 opacity-90" />
                <span>My Borrowed Books</span>
              </button>
            </>
          )}

          <div className="pt-4 px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Account
          </div>

          <button
            className="w-full py-2.5 px-3.5 font-medium rounded-xl text-slate-300 hover:bg-slate-800/80 hover:text-white transition-all duration-200 hover:cursor-pointer flex items-center space-x-3 text-sm"
            onClick={() => dispatch(toggleSettingPopup())}
          >
            <img src={settingIcon} alt="icon" className="w-5 h-5 opacity-90" />
            <span>Update Password</span>
          </button>
        </nav>

        {/* User Card & Logout Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
          <button
            className="w-full py-2.5 px-3 rounded-xl font-medium text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 flex items-center justify-center space-x-2 text-sm border border-slate-800 hover:border-rose-500/30 cursor-pointer"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="logout" className="w-4 h-4 opacity-80" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;
