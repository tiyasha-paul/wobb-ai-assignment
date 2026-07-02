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
          🔍
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
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
        />
      ))}
    </div>
  );
}
