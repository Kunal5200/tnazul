import { Usercontrollers } from "@/app/api/userControllers";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

export const useUpdatePhoto = () => {
  const [loading, setLoading] = useState(false);
  const fetchUserDetail = useUserStore((state) => state.fetchUserDetail);

  const updatePhoto = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await Usercontrollers.updatePhoto(formData);
      await fetchUserDetail(true);
      return res;
    } catch (err) {
      console.error("error in update photo", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    updatePhoto,
    loading,
  };
};
