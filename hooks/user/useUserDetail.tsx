import { useEffect } from "react";
import { useUserStore, UserDetail } from "@/store/userStore";

export type { UserDetail };

export const fetchGlobalUserDetail = (forceRefetch = false) => {
  return useUserStore.getState().fetchUserDetail(forceRefetch);
};

export const clearUserCache = () => {
  useUserStore.getState().clearUser();
};

export const useUserDetail = () => {
  const userData = useUserStore((state) => state.userData);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const fetchUserDetail = useUserStore((state) => state.fetchUserDetail);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  return {
    userData,
    loading,
    error,
    refetch: () => fetchUserDetail(true),
  };
};
