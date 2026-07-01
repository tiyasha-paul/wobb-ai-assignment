import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useListStore } from "@/store/useListStore";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const location = useLocation();
  const listCount = useListStore((s) => s.profiles.length);

  return (
    <div className="min-h-screen bg-brand-light/30">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-brand hover:text-brand-dark transition-colors tracking-tight flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-brand-accent flex items-center justify-center text-white text-lg shadow-md">
                W
              </div>
              Influencer Search
            </Link>
            <Link
              to="/list"
              className={`px-4 py-2 rounded-full font-medium transition-all shadow-sm ${
                location.pathname === "/list"
                  ? "bg-brand text-white shadow-brand/30 ring-2 ring-brand ring-offset-2"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-brand-accent hover:bg-brand-light/50 hover:text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              }`}
            >
              Saved List
              {listCount > 0 && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 rounded-full font-bold ${
                    location.pathname === "/list"
                      ? "bg-white text-brand"
                      : "bg-brand text-white"
                  }`}
                >
                  {listCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {title && (
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
}
