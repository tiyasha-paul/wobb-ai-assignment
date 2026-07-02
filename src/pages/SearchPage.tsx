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

  const handlePlatformChange = (p: Platform) => {
    setSearchParams((prev) => {
      prev.set("platform", p);
      prev.delete("q");
      return prev;
    });
  };

  const handleSearchChange = (q: string) => {
    setSearchParams((prev) => {
      if (q) prev.set("q", q);
      else prev.delete("q");
      return prev;
    });
  };

  const allProfiles = extractProfiles(platform);
  const filtered = filterProfiles(allProfiles, searchQuery);

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

      <div className="flex justify-between items-end mb-6 border-b-4 border-black pb-2 mt-8">
        <h2 className="text-2xl font-black text-black uppercase tracking-tight">
          {searchQuery ? "SEARCH RESULTS" : "FEATURED PROFILES"}
        </h2>
        <p className="text-sm font-black text-black bg-brand-light px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase">
          Showing {filtered.length} of {allProfiles.length}
        </p>
      </div>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}
