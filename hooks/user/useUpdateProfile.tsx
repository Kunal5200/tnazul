import { Usercontrollers } from "@/app/api/userControllers";
import { UpdateProfilePayload } from "@/utils/types";
import { useState } from "react";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const updateProfile = async (data: UpdateProfilePayload) => {
    setLoading(true);
    try {
      const res = await Usercontrollers.updateProfile(data);
      console.log("update profile res", res);
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
