import { Usercontrollers } from "@/app/api/userControllers";
import { useEffect, useState } from "react";

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
}

let userCache: UserDetail | null = null;
let pendingUserPromise: Promise<UserDetail | null> | null = null;

export const fetchGlobalUserDetail = async (forceRefetch = false): Promise<UserDetail | null> => {
  if (!forceRefetch && userCache) {
    return userCache;
  }
  if (!forceRefetch && pendingUserPromise) {
    return pendingUserPromise;
  }

  pendingUserPromise = (async () => {
    try {
      const res = await Usercontrollers.getUserDetail();
      const user = res?.data || res?.user || res;
      userCache = user;
      return user;
    } finally {
      pendingUserPromise = null;
    }
  })();

  return pendingUserPromise;
};

export const clearUserCache = () => {
  userCache = null;
  pendingUserPromise = null;
};

export const useUserDetail = () => {
  const [userData, setUserData] = useState<UserDetail | null>(userCache);
  const [loading, setLoading] = useState<boolean>(!userCache);
  const [error, setError] = useState<string | null>(null);

  const fetchUserDetail = async (force = false) => {
    if (!userCache || force) {
      setLoading(true);
    }
    setError(null);
    try {
      const user = await fetchGlobalUserDetail(force);
      setUserData(user);
      return user;
    } catch (err: any) {
      console.error("Error fetching user details:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to load user profile.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return {
    userData,
    loading,
    error,
    refetch: () => fetchUserDetail(true),
  };
};
