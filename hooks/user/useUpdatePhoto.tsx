import { Usercontrollers } from "@/app/api/userControllers";
import { useState } from "react";

export const useUpdatePhoto = () => {
  const [loading, setLoading] = useState(false);

  const updatePhoto = async (file: File) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await Usercontrollers.updatePhoto(formData);
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
