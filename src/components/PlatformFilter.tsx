import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { SearchBar } from "./SearchBar";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8 flex flex-col items-center max-w-2xl mx-auto space-y-6">
      <div className="flex bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={`px-6 py-2 font-black uppercase tracking-tight transition-all duration-150 border-2 border-transparent ${
              selected === p
                ? "bg-brand text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "text-black hover:bg-brand-light hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {getPlatformLabel(p)}
          </button>
        ))}
      </div>
      
      <div className="w-full relative">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={`SEARCH ${getPlatformLabel(selected).toUpperCase()} INFLUENCERS...`}
          className="w-full pl-12 pr-4 py-4 bg-white border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-0.5 focus:-translate-x-0.5 transition-all text-black font-bold uppercase placeholder-gray-500"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black font-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
