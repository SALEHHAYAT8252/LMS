import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";

const WelcomeScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, 2400);

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center text-white z-50 animate-fade-in transition-all duration-700 ease-in-out">
      {/* Glowing icon badge */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl animate-pulse" />
        <div className="relative p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <BookOpen className="w-12 h-12 text-blue-400" />
        </div>
      </div>

      {/* Main Heading */}
      <div className="text-center px-4">
        <span className="text-xs uppercase font-bold tracking-widest text-blue-400 mb-1 block">
          Welcome to
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white animate-scale-up">
          ByteBooks
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium">
          Modern Library Management System
        </p>
      </div>

      {/* Progress pill */}
      <div className="mt-8 w-36 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default WelcomeScreen;
