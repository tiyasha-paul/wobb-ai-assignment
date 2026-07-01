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
    <div className="p-4 min-h-screen">
      <header className="mb-6 border-b pb-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-semibold text-gray-900">
            Influencer Search
          </Link>
          <Link
            to="/list"
            className={`px-4 py-2 rounded font-medium transition-colors ${
              location.pathname === "/list"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Saved List {listCount > 0 && <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{listCount}</span>}
          </Link>
        </div>
        {title && <h1 className="text-2xl mt-2">{title}</h1>}
      </header>
      <main>{children}</main>
    </div>
  );
}
