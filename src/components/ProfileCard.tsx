import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useListStore((s) => s.addProfile);
  const removeProfile = useListStore((s) => s.removeProfile);
  const isInList = useListStore((s) => s.isInList(profile.user_id));

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInList) {
      removeProfile(profile.user_id);
    } else {
      addProfile({
        user_id: profile.user_id,
        username: profile.username,
        fullname: profile.fullname,
        picture: profile.picture,
        followers: profile.followers,
        platform,
        is_verified: profile.is_verified,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex flex-col text-left bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-brand-accent transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 w-full group"
      data-search={searchQuery}
      aria-label={`View ${profile.fullname}'s profile`}
    >
      <div className="p-5 flex-1 w-full">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={profile.picture}
            alt={profile.fullname}
            className="w-16 h-16 rounded-full border-2 border-white shadow-sm ring-2 ring-brand-light object-cover bg-gray-50"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-900 truncate text-lg flex items-center">
              @{profile.username}
              <VerifiedBadge verified={profile.is_verified} />
            </div>
            <div className="text-sm text-gray-500 truncate mb-1">{profile.fullname}</div>
            <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-light text-brand-dark">
              {formatFollowers(profile.followers)} followers
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center group-hover:bg-brand-light/20 transition-colors">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {platform}
        </span>
        <button
          type="button"
          onClick={handleListToggle}
          className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isInList
              ? "bg-green-50 text-green-700 border border-green-200 hover:bg-red-50 hover:text-red-700 hover:border-red-200 focus:ring-red-500"
              : "bg-brand text-white hover:bg-brand-dark shadow-sm focus:ring-brand"
          }`}
        >
          {isInList ? "Added ✓" : "Add to List"}
        </button>
      </div>
    </button>
  );
}
