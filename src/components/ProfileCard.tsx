import React from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { useListStore } from "@/store/useListStore";
import { hasProfileDetail } from "@/utils/profileLoader";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery: string;
}

export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
  searchQuery,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const addProfile = useListStore((s) => s.addProfile);
  const removeProfile = useListStore((s) => s.removeProfile);
  const isInList = useListStore((s) => s.isInList(profile?.user_id));
  const hasDetail = profile?.username ? hasProfileDetail(profile.username) : false;

  if (!profile) return null;

  const handleClick = () => {
    if (hasDetail) {
      navigate(`/profile/${profile.username}?platform=${platform}`);
    }
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
      onClick={hasDetail ? handleClick : undefined}
      role={hasDetail ? "button" : "article"}
      tabIndex={hasDetail ? 0 : undefined}
      onKeyDown={(e) => {
        if (hasDetail && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={`flex flex-col text-left bg-white border-[3px] border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 focus:outline-none w-full group ${
        hasDetail 
          ? "cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1" 
          : "opacity-90"
      }`}
      data-search={searchQuery}
      aria-label={hasDetail ? `View ${profile.fullname || profile.username}'s profile` : `${profile.fullname || profile.username} (Preview only)`}
    >
      <div className="p-5 flex-1 w-full">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={profile.picture}
            alt={profile.fullname || profile.username}
            className="w-16 h-16 flex-shrink-0 rounded-full border-[3px] border-black object-cover bg-brand-light"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname || profile.username || 'U')}&background=F4F4F0&color=000&bold=true`;
            }}
          />
          <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="font-black text-black text-lg flex items-center uppercase tracking-tight mb-1">
              <span className="truncate min-w-0">@{profile.username || 'unknown'}</span>
              <VerifiedBadge verified={!!profile.is_verified} />
            </div>
            <div className="text-sm font-bold text-gray-700 truncate mb-2">{profile.fullname || '-'}</div>
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex self-start items-center px-2 py-1 border-2 border-black text-xs font-black uppercase tracking-tight bg-brand-light text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {formatFollowers(profile.followers || 0)} followers
              </div>
              {!hasDetail && (
                <div className="inline-flex self-start items-center px-2 py-1 border-2 border-black text-xs font-black uppercase tracking-tight bg-gray-100 text-gray-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  Preview Only
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-white border-t-[3px] border-black flex justify-between items-center z-10" onClick={(e) => e.stopPropagation()}>
        <span className="text-xs font-black text-black uppercase tracking-tight bg-brand-light px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          {platform}
        </span>
        <button
          type="button"
          onClick={handleListToggle}
          className={`px-4 py-1.5 text-sm font-black uppercase tracking-tight border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 ${
            isInList
              ? "bg-brand-accent text-black"
              : "bg-brand text-white"
          }`}
        >
          {isInList ? "ADDED" : "ADD"}
        </button>
      </div>
    </div>
  );
});
