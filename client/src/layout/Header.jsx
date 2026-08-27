import React, { useEffect, useState } from "react";
import settingIcon from "../assets/setting.png";
import userIcon from "../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";
import { Settings, Clock, Calendar } from "lucide-react";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      const hours = now.getHours() % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const ampm = now.getHours() >= 12 ? "PM" : "AM";
      setCurrentTime(`${hours}:${minutes} ${ampm}`);

      const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      setCurrentDate(now.toLocaleDateString("en-US", options));
    };

    updateDateTime();

    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3 px-6 shadow-xs flex justify-between items-center z-10">
      {/* Left Side: User Profile Snippet */}
      <div className="flex items-center gap-3">
        <div className="relative">
          {user?.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/20 shadow-xs"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-800 tracking-tight sm:text-base">
            {user ? user.name : "Welcome"}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                user?.role === "Admin"
                  ? "bg-blue-50 text-blue-700 border-blue-200/60"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              }`}
            >
              {user ? user.role : "Member"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Side: DateTime & Settings */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/70 px-3.5 py-1.5 rounded-xl text-xs text-slate-600 font-medium shadow-2xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>{currentTime}</span>
          </div>
          <span className="w-px h-3.5 bg-slate-200" />
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentDate}</span>
          </div>
        </div>

        <button
          onClick={() => dispatch(toggleSettingPopup())}
          title="Settings"
          className="p-2 rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 border border-slate-200/70 hover:border-blue-200 cursor-pointer shadow-2xs"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default Header;
