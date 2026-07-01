import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useListStore((s) => s.addProfile);
  const removeProfile = useListStore((s) => s.removeProfile);
  const isInList = useListStore((s) => s.isInList(profile.user_id));

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
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
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
      data-search={searchQuery}
    >
      <img
        src={profile.picture}
        alt={profile.fullname}
        className="w-12 h-12 rounded-full"
      />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      <button
        onClick={handleListToggle}
        className={`px-3 py-1 text-sm rounded transition-colors ${
          isInList
            ? "bg-green-100 text-green-700 border border-green-300 hover:bg-red-100 hover:text-red-700 hover:border-red-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isInList ? "Added ✓" : "Add to List"}
      </button>
    </div>
  );
}
