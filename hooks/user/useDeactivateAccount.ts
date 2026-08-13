import { Usercontrollers } from "@/app/api/userControllers";
import { useState } from "react";

export const useDeactivateAccount = () => {
  const [loading, setLoading] = useState(false);

  const deactivateAccount = async (status: string = "INACTIVE") => {
    setLoading(true);
    try {
      const res = await Usercontrollers.deactivateAccount(status);
      console.log("deactivate account res", res);
      return res;
    } catch (err) {
      console.error("error in deactivate account", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deactivateAccount,
    loading,
  };
};
