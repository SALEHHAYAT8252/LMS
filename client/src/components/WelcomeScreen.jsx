import { useEffect, useState } from "react";

const WelcomeScreen = ()=> {
  const [show, setShow] = useState(true);

 useEffect(() => {
  const timeout = setTimeout(() => {
    setShow(false);
  }, 3000); // Show welcome screen for 3 seconds

  return () => clearTimeout(timeout); // Clean up timeout when component unmounts
}, []);

  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-gradient-to-br from-blue-800 to-blue-500 flex flex-col items-center justify-center text-white z-50 animate-fade-in transition-all duration-700 ease-in-out">
      {/* Icon or logo */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-20 h-20 text-white animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6V4m0 0L4 8v12l8-4 8 4V8l-8-4zm0 0v2m0 0v2"
          />
        </svg>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wide text-center animate-scale-up">
        Welcome to
      </h1>

      {/* Subheading */}
      <p className="text-lg sm:text-xl mt-2 font-medium text-center">
        ByteBooks Library Management System
      </p>
    </div>
  );
}

export default WelcomeScreen;
