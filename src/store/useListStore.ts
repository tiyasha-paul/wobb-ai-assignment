import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform } from "@/types";

export interface SavedProfile {
  user_id: string;
  username: string;
  fullname: string;
  picture: string;
  followers: number;
  platform: Platform;
  is_verified: boolean;
}

interface ListState {
  profiles: SavedProfile[];
  addProfile: (profile: SavedProfile) => void;
  removeProfile: (user_id: string) => void;
  isInList: (user_id: string) => boolean;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      profiles: [],

      addProfile: (profile: SavedProfile) => {
        const { profiles } = get();
        if (profiles.some((p) => p.user_id === profile.user_id)) return;
        set({ profiles: [...profiles, profile] });
      },

      removeProfile: (user_id: string) => {
        set({ profiles: get().profiles.filter((p) => p.user_id !== user_id) });
      },

      isInList: (user_id: string) => {
        return get().profiles.some((p) => p.user_id === user_id);
      },
    }),
    {
      name: "wobb-saved-profiles",
    }
  )
);
