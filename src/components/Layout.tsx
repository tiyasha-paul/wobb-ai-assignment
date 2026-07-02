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
    <div className="min-h-screen bg-[#FFF0F5] font-sans" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 20 C 30 26, 130 14, 160 20 M 0 60 C 40 54, 120 66, 160 60 M 0 100 C 50 106, 110 94, 160 100 M 0 140 C 30 134, 130 146, 160 140 M 20 0 C 26 30, 14 130, 20 160 M 60 0 C 54 40, 66 120, 60 160 M 100 0 C 106 50, 94 110, 100 160 M 140 0 C 134 30, 146 130, 140 160' fill='none' stroke='rgba(0,0,0,0.1)' stroke-width='1.5'/%3E%3C/svg%3E\")" }}>
      <header className="bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="text-2xl font-black text-black hover:text-brand transition-colors tracking-tight flex items-center gap-2 uppercase"
            >
              <div className="w-10 h-10 bg-brand text-white border-[3px] border-black flex items-center justify-center text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                W
              </div>
              Influencer Search
            </Link>
            <Link
              to="/list"
              className={`px-4 py-2 border-2 border-black font-black uppercase tracking-tight transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 ${
                location.pathname === "/list"
                  ? "bg-brand text-white"
                  : "bg-brand-light text-black hover:bg-brand hover:text-white"
              }`}
            >
              Saved List
              {listCount > 0 && (
                <span
                  className={`ml-2 text-xs px-2 py-0.5 border border-black font-black ${
                    location.pathname === "/list"
                      ? "bg-white text-black"
                      : "bg-black text-white"
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
          <h1 className="text-4xl font-black text-black mb-8 tracking-tighter uppercase border-b-4 border-black pb-4 inline-block">
            {title}
          </h1>
        )}
        {children}
      </main>
    </div>
  );
}
