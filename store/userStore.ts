import { create } from "zustand";
import { Usercontrollers } from "@/app/api/userControllers";

export interface UserDetail {
  _id?: string;
  name?: string;
  email?: string;
  phoneNo?: string;
  countryCode?: string;
  roleName?: string;
  avatar?: string;
  accountType?: string;
  birthDate?: string;
  cityOrRegion?: string;
  languagePreference?: string;
  [key: string]: any;
}

interface UserState {
  userData: UserDetail | null;
  loading: boolean;
  error: string | null;

  // Actions
  fetchUserDetail: (forceRefetch?: boolean) => Promise<UserDetail | null>;
  setUserData: (user: UserDetail | null) => void;
  updateUserData: (partial: Partial<UserDetail>) => void;
  clearUser: () => void;
}

let pendingFetchPromise: Promise<UserDetail | null> | null = null;

export const useUserStore = create<UserState>((set, get) => ({
  userData: null,
  loading: false,
  error: null,

  fetchUserDetail: async (forceRefetch = false) => {
    const { userData } = get();

    if (!forceRefetch && userData) {
      return userData;
    }

    if (!forceRefetch && pendingFetchPromise) {
      return pendingFetchPromise;
    }

    set({ loading: true, error: null });

    pendingFetchPromise = (async () => {
      try {
        const res = await Usercontrollers.getUserDetail();
        const user = res?.data || res?.user || res;
        set({ userData: user, loading: false, error: null });
        return user;
      } catch (err: any) {
        console.error("Error fetching user detail in zustand store:", err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load user profile.";
        set({ error: msg, loading: false });
        return null;
      } finally {
        pendingFetchPromise = null;
      }
    })();

    return pendingFetchPromise;
  },

  setUserData: (user) => set({ userData: user, error: null }),

  updateUserData: (partial) =>
    set((state) => ({
      userData: state.userData
        ? { ...state.userData, ...partial }
        : (partial as UserDetail),
    })),

  clearUser: () => set({ userData: null, error: null, loading: false }),
}));
