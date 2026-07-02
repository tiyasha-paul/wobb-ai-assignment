import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
}

export function ProfileList({
  profiles,
  platform,
  searchQuery,
}: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="py-16 text-center bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="w-16 h-16 mx-auto mb-4 bg-brand-light border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-brand text-2xl -rotate-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <h3 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">NO PROFILES FOUND</h3>
        <p className="text-black font-bold uppercase">
          We couldn't find anyone matching "{searchQuery}" on {platform}.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile, index) => {
        if (!profile) return null;
        return (
        <ProfileCard
          key={profile.user_id || profile.username || index}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
        />
      )})}
    </div>
  );
}
