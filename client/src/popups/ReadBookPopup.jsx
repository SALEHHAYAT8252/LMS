import React from "react";
import { useDispatch } from "react-redux";
import { toggleReadBookPopup } from "../store/slices/popUpSlice";
import { BookOpen, X, CheckCircle2, XCircle } from "lucide-react";

const ReadBookPopup = ({ book }) => {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs p-4 flex items-center justify-center z-50 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Book Details</h3>
              <p className="text-xs text-slate-500">
                Detailed information regarding this title
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleReadBookPopup())}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Title
            </span>
            <h4 className="text-lg font-bold text-slate-900">
              {book?.title || "Untitled"}
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Author
              </span>
              <p className="text-sm font-semibold text-slate-800">
                {book?.author || "Unknown"}
              </p>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Borrow Price
              </span>
              <p className="text-sm font-bold text-slate-900">
                ₹{book?.price ?? "0"}
              </p>
            </div>
          </div>

          {book?.description && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Description
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {book.description}
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-500">Status:</span>
            {book?.availability ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <CheckCircle2 className="w-3.5 h-3.5" /> In Stock & Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                <XCircle className="w-3.5 h-3.5" /> Currently Unavailable
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => dispatch(toggleReadBookPopup())}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadBookPopup;
