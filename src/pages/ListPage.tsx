import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { useListStore } from "@/store/useListStore";
import { formatFollowers } from "@/utils/formatters";

export function ListPage() {
  const profiles = useListStore((s) => s.profiles);
  const removeProfile = useListStore((s) => s.removeProfile);

  return (
    <Layout title="My Saved List">
      <Link to="/" className="text-sm text-blue-600 mb-4 inline-block">
        ← Back to search
      </Link>

      {profiles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">Your list is empty</p>
          <p className="text-gray-400 text-sm">
            Browse influencers and click "Add to List" to save them here.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Browse Influencers
          </Link>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 mb-4">
            {profiles.length} profile{profiles.length !== 1 ? "s" : ""} saved
          </p>
          <div className="flex flex-col gap-2">
            {profiles.map((profile) => (
              <div
                key={profile.user_id}
                className="flex items-center gap-3 p-3 border border-gray-300 rounded"
              >
                <Link
                  to={`/profile/${profile.username}?platform=${profile.platform}`}
                  className="flex items-center gap-3 flex-1 no-underline text-inherit"
                >
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-bold text-gray-900">
                      @{profile.username}
                      <VerifiedBadge verified={profile.is_verified} />
                    </div>
                    <div className="text-sm text-gray-600">
                      {profile.fullname}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatFollowers(profile.followers)} followers ·{" "}
                      {profile.platform}
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeProfile(profile.user_id)}
                  className="px-3 py-1 text-sm rounded bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
