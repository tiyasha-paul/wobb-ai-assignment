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
      <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
        <div className="w-16 h-16 mx-auto mb-4 bg-brand-light rounded-full flex items-center justify-center text-brand text-2xl">
          🔍
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">No profiles found</h3>
        <p className="text-gray-500">
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
