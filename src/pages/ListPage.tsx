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
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Saved List</h1>
          <p className="text-gray-500 mt-1">Manage your shortlisted influencers</p>
        </div>
        <Link 
          to="/" 
          className="text-sm font-medium text-brand hover:text-brand-dark flex items-center gap-1 transition-colors bg-brand-light/50 px-4 py-2 rounded-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Search
        </Link>
      </div>

      {profiles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm mt-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-brand-light/50 rounded-full flex items-center justify-center text-4xl shadow-inner border border-brand-light">
            📌
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your list is empty</h2>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Browse creators and click "Add to List" to save your favorites here for your upcoming campaigns.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
          >
            Browse Influencers
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.user_id}
              className="flex flex-col text-left bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group"
            >
              <Link
                to={`/profile/${profile.username}?platform=${profile.platform}`}
                className="p-5 flex-1 w-full focus:outline-none focus:ring-2 focus:ring-brand focus:ring-inset"
              >
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-16 h-16 rounded-full border-2 border-white shadow-sm ring-2 ring-brand-light object-cover bg-gray-50"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-900 truncate text-lg flex items-center group-hover:text-brand transition-colors">
                      @{profile.username}
                      <VerifiedBadge verified={profile.is_verified} />
                    </div>
                    <div className="text-sm text-gray-500 truncate mb-1">
                      {profile.fullname}
                    </div>
                    <div className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-brand-light text-brand-dark">
                      {formatFollowers(profile.followers)} followers
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center group-hover:bg-red-50/30 transition-colors">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {profile.platform}
                </span>
                <button
                  onClick={() => removeProfile(profile.user_id)}
                  className="px-4 py-1.5 text-sm font-medium rounded-full bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all shadow-sm"
                  aria-label={`Remove ${profile.fullname} from list`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
