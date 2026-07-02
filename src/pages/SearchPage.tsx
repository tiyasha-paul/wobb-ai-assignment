import { useMemo, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const searchQuery = searchParams.get("q") || "";
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  const handlePlatformChange = useCallback((p: Platform) => {
    setSearchParams((prev) => {
      prev.set("platform", p);
      prev.delete("q");
      return prev;
    });
  }, [setSearchParams]);

  const handleSearchChange = useCallback((q: string) => {
    setSearchParams((prev) => {
      if (q) prev.set("q", q);
      else prev.delete("q");
      return prev;
    });
  }, [setSearchParams]);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);
  
  const sortedAndFiltered = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const followersA = a.followers || 0;
      const followersB = b.followers || 0;
      return sortOrder === "desc" ? followersB - followersA : followersA - followersB;
    });
  }, [filtered, sortOrder]);

  return (
    <Layout>
      <div className="text-center mb-10 border-[3px] border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-5xl sm:text-6xl font-black text-black tracking-tighter mb-4 uppercase">
          Discover Top <span className="text-white bg-brand px-2 border-2 border-black inline-block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2">Creators</span>
        </h1>
        <p className="text-lg text-black font-bold max-w-2xl mx-auto uppercase">
          Find and save the best influencers across Instagram, YouTube, and TikTok for your next campaign.
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={handlePlatformChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <div className="flex justify-between items-end mb-6 border-b-4 border-black pb-2 mt-8 gap-4 flex-wrap">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          {searchQuery ? "SEARCH RESULTS" : "FEATURED PROFILES"}
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setSortOrder(s => s === "desc" ? "asc" : "desc")}
            className="text-sm font-black text-black bg-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all uppercase flex items-center gap-1 cursor-pointer"
          >
            Followers: {sortOrder === "desc" ? "High to Low" : "Low to High"}
          </button>
          <p className="text-sm font-black text-black bg-brand-light px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase whitespace-nowrap">
            Showing {sortedAndFiltered.length} of {allProfiles.length}
          </p>
        </div>
      </div>

      <ProfileList
        profiles={sortedAndFiltered}
        platform={platform}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}
