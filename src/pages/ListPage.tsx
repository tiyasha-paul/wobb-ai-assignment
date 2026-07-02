import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useListStore } from "@/store/useListStore";
import { formatFollowers } from "@/utils/formatters";

export function ListPage() {
  const profiles = useListStore((s) => s.profiles);
  const removeProfile = useListStore((s) => s.removeProfile);

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase mb-2">SAVED LIST</h1>
          <p className="text-black font-bold uppercase">Manage your shortlisted influencers</p>
        </div>
        <Link 
          to="/" 
          className="text-sm font-black text-black hover:text-white hover:bg-black flex items-center gap-1 transition-all border-2 border-black bg-brand-light px-4 py-2 uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          BACK TO SEARCH
        </Link>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-20 bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-brand-light flex items-center justify-center text-4xl border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-3">
            📌
          </div>
          <h2 className="text-3xl font-black text-black mb-4 uppercase">Your list is empty</h2>
          <p className="text-black font-bold max-w-md mx-auto mb-8 uppercase">
            Browse creators and click "Add" to save your favorites here for your upcoming campaigns.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-brand text-white font-black uppercase tracking-tight border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            Browse Influencers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.user_id}
              className="flex flex-col text-left bg-white border-[3px] border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 relative group"
            >
              <Link
                to={`/profile/${profile.username}?platform=${profile.platform}`}
                className="p-5 flex-1 w-full focus:outline-none"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-16 h-16 rounded-full border-[3px] border-black object-cover bg-brand-light"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-black truncate text-lg flex items-center uppercase tracking-tight group-hover:text-brand transition-colors">
                      @{profile.username}
                      <VerifiedBadge verified={profile.is_verified} />
                    </div>
                    <div className="text-sm font-bold text-gray-700 truncate mb-2">
                      {profile.fullname}
                    </div>
                    <div className="inline-flex items-center px-2 py-1 border-2 border-black text-xs font-black uppercase tracking-tight bg-brand-light text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {formatFollowers(profile.followers)} followers
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-5 py-3 bg-white border-t-[3px] border-black flex justify-between items-center group-hover:bg-brand-light transition-colors">
                <span className="text-xs font-black text-black uppercase tracking-tight bg-white px-2 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  {profile.platform}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeProfile(profile.user_id);
                  }}
                  className="px-4 py-1.5 text-sm font-black uppercase tracking-tight border-2 border-black bg-brand-accent text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
                  aria-label={`Remove ${profile.fullname} from list`}
                >
                  REMOVE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
