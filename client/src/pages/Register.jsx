import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 import { Link, useNavigate, Navigate } from "react-router-dom";
 import { register, resetAuthSlice } from "../store/slices/authSlice";
 import { toast } from "react-toastify";
 import { User, Mail, Lock, ArrowRight, BookOpen } from "lucide-react";

 const Register = () => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const dispatch = useDispatch();

   const { loading, error, message, isAuthenticated } = useSelector(
     (state) => state.auth
   );

   const navigateTo = useNavigate();

   const handleRegister = (e) => {
     e.preventDefault();
     const data = new FormData();
     data.append("name", name);
     data.append("email", email);
     data.append("password", password);
     dispatch(register(data));
   };

   useEffect(() => {
     if (message) {
       toast.success(message);
       dispatch(resetAuthSlice());
       navigateTo(`/otp-verification/${email}`);
     }
     if (error) {
       toast.error(error);
       dispatch(resetAuthSlice());
     }
   }, [error, isAuthenticated, dispatch, loading, message, email, navigateTo]);

   if (isAuthenticated) {
     return <Navigate to="/" />;
   }

   return (
     <div className="min-h-screen flex bg-slate-50">
       {/* Left Section (Brand Showcase) */}
       <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white flex-col items-center justify-center p-12 relative overflow-hidden">
         {/* Glow effects */}
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

         <div className="w-full max-w-md p-10 text-center rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl relative z-10">
           <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6 shadow-inner">
             <BookOpen className="w-8 h-8 text-blue-400" />
           </div>

           <h2 className="text-3xl font-extrabold tracking-tight mb-3">
             Join ByteBooks
           </h2>
           <p className="text-sm text-slate-300 mb-8 leading-relaxed">
             Create your student or reader account to access the catalog, check out books, and manage reading loans.
           </p>

           <div className="pt-4 border-t border-white/10">
             <p className="text-xs text-slate-400 mb-4">
               Already have an account?
             </p>
             <Link
               to="/login"
               className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition shadow-md cursor-pointer"
             >
               Sign In Instead
             </Link>
           </div>
         </div>
       </div>

       {/* Right Section (Register Form) */}
       <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
         <div className="w-full max-w-md">
           {/* Mobile Logo */}
           <div className="flex items-center gap-2 mb-8 md:hidden">
             <div className="p-2 rounded-xl bg-blue-600 text-white">
               <BookOpen className="w-6 h-6" />
             </div>
             <span className="text-xl font-bold text-slate-900 tracking-tight">
               ByteBooks
             </span>
           </div>

           <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-8 sm:p-10">
             <div className="mb-6">
               <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                 Create Account
               </h2>
               <p className="text-sm text-slate-500 mt-1">
                 Please enter your details to sign up for ByteBooks
               </p>
             </div>

             <form onSubmit={handleRegister} className="space-y-4">
               <div>
                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                   Full Name
                 </label>
                 <div className="relative">
                   <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                   <input
                     type="text"
                     value={name}
                     required
                     onChange={(e) => setName(e.target.value)}
                     placeholder="John Doe"
                     className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                   Email Address
                 </label>
                 <div className="relative">
                   <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                   <input
                     type="email"
                     value={email}
                     required
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder="name@example.com"
                     className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                   />
                 </div>
               </div>

               <div>
                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                   Password
                 </label>
                 <div className="relative">
                   <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                   <input
                     type="password"
                     value={password}
                     required
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="••••••••"
                     className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                   />
                 </div>
               </div>

               <button
                 type="submit"
                 disabled={loading}
                 className="w-full mt-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-600/20 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
               >
                 <span>{loading ? "Creating..." : "Create Account"}</span>
                 <ArrowRight className="w-4 h-4" />
               </button>
             </form>

             <div className="mt-6 pt-6 border-t border-slate-100 text-center md:hidden">
               <p className="text-xs text-slate-500">
                 Already have an account?{" "}
                 <Link
                   to="/login"
                   className="font-semibold text-blue-600 hover:underline"
                 >
                   Sign In
                 </Link>
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default Register;
