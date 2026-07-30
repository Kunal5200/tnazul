import { Usercontrollers } from "@/app/api/userControllers";
import { UpdateProfilePayload } from "@/utils/types";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const fetchUserDetail = useUserStore((state) => state.fetchUserDetail);

  const updateProfile = async (data: UpdateProfilePayload) => {
    setLoading(true);
    try {
      const res = await Usercontrollers.updateProfile(data);
      console.log("update profile res", res);
      await fetchUserDetail(true);
      return res;
    } catch (err) {
      console.error("error in update profile", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,
    loading,
  };
};
