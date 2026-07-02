import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useListStore } from "@/store/useListStore";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "instagram") as Platform;
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const addProfile = useListStore((s) => s.addProfile);
  const removeProfile = useListStore((s) => s.removeProfile);
  const isInList = useListStore((s) =>
    username ? s.profiles.some((p) => p.username === username) : false
  );

  useEffect(() => {
    if (!username) return;

    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid profile</h2>
          <Link to="/" className="text-brand hover:underline font-medium">Return to search</Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-light border-t-brand rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading profile data...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm mt-8 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile not found</h2>
          <p className="text-gray-500 mb-6">Could not load details for @{username}</p>
          <Link to="/" className="inline-flex px-6 py-2 bg-brand text-white font-medium rounded-full hover:bg-brand-dark transition-colors">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const handleListToggle = () => {
    if (isInList) {
      removeProfile(user.user_id);
    } else {
      addProfile({
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        picture: user.picture,
        followers: user.followers,
        platform,
        is_verified: user.is_verified,
      });
    }
  };

  const statBoxes = [
    { label: "Followers", value: formatFollowers(user.followers) },
    { label: "Engagement", value: formatEngagementRate(user.engagement_rate) },
    ...(user.posts_count !== undefined ? [{ label: "Posts", value: user.posts_count }] : []),
    ...(user.avg_likes !== undefined ? [{ label: "Avg Likes", value: formatFollowers(user.avg_likes) }] : []),
    ...(user.avg_comments !== undefined ? [{ label: "Avg Comments", value: user.avg_comments }] : []),
    ...(user.avg_views !== undefined && user.avg_views > 0 ? [{ label: "Avg Views", value: formatFollowers(user.avg_views) }] : []),
    ...(user.engagements !== undefined ? [{ label: "Engagements", value: formatFollowers(user.engagements) }] : []),
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm font-black text-black hover:text-white hover:bg-black transition-all border-2 border-black bg-brand-light px-4 py-2 mb-6 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          BACK TO SEARCH
        </Link>

        <div className="bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Header/Cover Area */}
          <div className="h-32 bg-brand-light border-b-[3px] border-black relative">
            <div className="absolute -bottom-16 left-8">
              <img
                src={user.picture}
                alt={user.fullname || user.username}
                className="w-32 h-32 flex-shrink-0 rounded-full border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname || user.username || 'U')}&background=F4F4F0&color=000&bold=true`;
                }}
              />
            </div>
          </div>
          
          <div className="pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-4xl font-black text-black flex items-center gap-2 uppercase tracking-tight">
                  <span className="truncate min-w-0">{user.fullname || user.username}</span>
                  <VerifiedBadge verified={!!user.is_verified} />
                </h1>
                <p className="text-xl font-bold text-black mb-2 uppercase tracking-tight">@{user.username || 'unknown'}</p>
                <div className="inline-block px-3 py-1 bg-white border-2 border-black text-black font-black uppercase tracking-tight mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {platform}
                </div>
                
                {user.description && (
                  <p className="text-black font-bold leading-relaxed whitespace-pre-line bg-brand-light p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mt-2">
                    {user.description}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row md:flex-col gap-4 min-w-[200px]">
                <button
                  onClick={handleListToggle}
                  className={`w-full px-6 py-3 font-black uppercase tracking-tight border-[3px] border-black transition-all flex justify-center items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 ${
                    isInList
                      ? "bg-brand-accent text-black"
                      : "bg-brand text-white"
                  }`}
                >
                  {isInList ? (
                    <>
                      <span>✓ ADDED TO LIST</span>
                    </>
                  ) : (
                    <>
                      <span>+ ADD TO LIST</span>
                    </>
                  )}
                </button>
                
                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-6 py-3 font-black uppercase tracking-tight bg-white text-black border-[3px] border-black hover:bg-brand-light transition-colors flex justify-center items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    VIEW PLATFORM
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-black text-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <span className="w-10 h-10 bg-brand-light flex items-center justify-center text-brand border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                </span>
                PERFORMANCE METRICS
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {statBoxes.map((stat, i) => (
                  <div key={i} className="bg-white border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all group hover:bg-brand-light">
                    <div className="text-sm font-bold text-black mb-1 uppercase tracking-tight">{stat.label}</div>
                    <div className="text-3xl font-black text-black">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
