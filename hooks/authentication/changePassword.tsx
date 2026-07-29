import { Authcontrollers } from "@/app/api/authControllers";
import { ChangePasswordPayload } from "@/utils/types";
import { useState } from "react";

export const useChangePassword = () => {
  const [loading, setLoading] = useState(false);

  const changePassword = async (data: ChangePasswordPayload) => {
    setLoading(true);
    try {
      const res = await Authcontrollers.changePassword(data);
      console.log("changePassword response:", res);
      return res;
    } catch (err) {
      console.error("error in changePassword:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    changePassword,
    loading,
  };
};
